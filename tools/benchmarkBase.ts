const fsx = require('fs-extra');
const fs = require('fs');
const TimelineModel = require('devtools-timeline-model');

import { Browser, Keyboard, Mouse, MouseButtons, ElementHandle, Page } from 'puppeteer';

const LOCALHOST = 'http://localhost:3000';

export abstract class BenchmarkBase {
    delay?: number;
    name: string;
    pageUrl: string;
    selectorInput = `document.querySelector('my-todo').shadowRoot.querySelector('todo-input').shadowRoot.querySelector('input')`;
    selectorButton = `document.querySelector('my-todo').shadowRoot.querySelector('todo-item').shadowRoot.querySelector('button')`;

    protected _resultPath: string;

    constructor(delay?: number){
        this.delay = delay;
    }

    init() {        
        this._resultPath =`../results/${this.name}`; 

        fsx.ensureDirSync(this._resultPath);
    }

    async creationTest(browser: Browser, numberOfCreation: number, index: number): Promise<number> {
        const page = await browser.newPage();
        const filename = `${this._resultPath}/create${index}.json`;
        const defaultOptions = {
            delay: this.delay
        };

        await page.goto(LOCALHOST + this.pageUrl);

        await page.tracing.start({
            path: filename
        });
        
        await this._createItems(page, numberOfCreation);

        await page.tracing.stop();
        await page.close();

        return processRawData(filename, index);
    }

    async deletionTest(browser: Browser, numberOfDeletion: number, index: number): Promise<number> {
        const page = await browser.newPage();
        const filename = `${this._resultPath}/delete${index}.json`;
        const defaultOptions = {
            delay: this.delay
        };

        await page.goto(LOCALHOST + this.pageUrl);

        await this._createItems(page, numberOfDeletion);

        await page.tracing.start({
            path: filename
        });

        for (let j = 0; j < numberOfDeletion; j++) {
            const buttonHandle = <ElementHandle> await page.evaluateHandle(this.selectorButton);
            
            await buttonHandle.click(defaultOptions);
        }

        await page.tracing.stop();
        await page.close();

        return processRawData(filename, index);
    }

    async _createItems(page: Page, numberOfItem: number) {
        const inputHandle = <ElementHandle> await page.evaluateHandle(this.selectorInput);
        const defaultOptions = {
            delay: this.delay
        };

        for (let j = 1; j <= numberOfItem; j++) {
            await inputHandle.type('New To-do: ' + j, defaultOptions);
            await inputHandle.press('Enter', defaultOptions);
        }
    }
}

function processRawData(filename: string, i: number) {    
    let events = fs.readFileSync(filename, 'utf8');
    var model = new TimelineModel(events);
    var topDown = model.topDown();
    
    return topDown.totalTime;
};