const puppeteer = require('puppeteer'),
    fs = require('fs-extra'),
    DevtoolsTimelineModel = require('devtools-timeline-model');

fs.ensureDirSync('results/angular-elements');
fs.ensureDirSync('results/lit-element');
fs.ensureDirSync('results/native-shadow-dom');
fs.ensureDirSync('results/native-shadow-dom_hyperHTML');
fs.ensureDirSync('results/native-shadow-dom_lit-html');
fs.ensureDirSync('results/polymer2');
fs.ensureDirSync('results/polymer3');
fs.ensureDirSync('results/svelte');
fs.ensureDirSync('results/vue');
fs.ensureDirSync('results/hyperhtml');

const numberOftests = 1,
    numberOfCreation = 1,
    selectorInput = `document.querySelector('my-todo').shadowRoot.querySelector('todo-input').shadowRoot.querySelector('input')`,
    selectorButton = `document.querySelector('my-todo').shadowRoot.querySelector('todo-item').shadowRoot.querySelector('button')`;

const LOCALHOST = 'http://localhost:3000';

let browser;
let page;
let average = 0;
let filename;

let processRawData = (filename, i) => {
    let events = require('fs').readFileSync(filename, 'utf8');
    var model = new DevtoolsTimelineModel(events);
    var topDown = model.topDown();
    average += topDown.totalTime;
    
    console.log(`Top down tree total time ${i}: ${Math.ceil(topDown.totalTime)}`);
};

(async () => {
    for (let i = 0; i < numberOftests; i++) {
        browser = await puppeteer.launch({ headless: false });
        page = await browser.newPage();

        filename = `results/native-shadow-dom/delete-todos_${i}.json`;

        await page.goto(`${LOCALHOST}/native-shadow-dom/dist/index.html`);

        const inputHandle = await page.evaluateHandle(selectorInput);

        for (let j = 0; j < numberOfCreation; j++) {
            await inputHandle.type('New todo');
            await inputHandle.press('Enter');
        }

        await page.tracing.start({
            path: filename
        });

        for (let j = 0; j < numberOfCreation; j++) {
            const buttonHandle = await page.evaluateHandle(selectorButton);
            await buttonHandle.click();
        }

        await page.tracing.stop();

        processRawData(filename, i);

        await browser.close();
    }

    average = average / numberOftests;

    console.log(`\nAverage time for native : ${Math.ceil(average)} ms\n`);

    average = 0;

    for (let i = 0; i < numberOftests; i++) {
        browser = await puppeteer.launch();
        page = await browser.newPage();

        filename = `results/native-shadow-dom_lit-html/create-todos_${i}.json`;
        await page.goto(`${LOCALHOST}/native-shadow-dom_lit-html/dist/index.html`);
        await page.tracing.start({
            path: filename
        });
        const inputHandle = await page.evaluateHandle(selectorInput);
        for (let j = 0; j < numberOfCreation; j++) {
            await inputHandle.type('New todo');
            await inputHandle.press('Enter');
        }
        await page.tracing.stop();
        processRawData(filename, i);
        await browser.close();
    }

    average = average / numberOftests;
    console.log(`\nAverage time for native + lit-html : ${Math.ceil(average)} ms\n`);

    average = 0;

    for (let i = 0; i < numberOftests; i++) {
        browser = await puppeteer.launch({ headless: true });
        page = await browser.newPage();

        filename = `results/polymer2/delete-todos_${i}.json`;

        await page.goto(`${LOCALHOST}/polymer2/build/es6-bundled/index.html`);

        const inputHandle = await page.evaluateHandle(selectorInput);

        for (let j = 0; j < numberOfCreation; j++) {
            await inputHandle.type('New todo');
            await inputHandle.press('Enter');
        }

        await page.tracing.start({
            path: filename
        });

        for (let j = 0; j < numberOfCreation; j++) {
            const buttonHandle = await page.evaluateHandle(selectorButton);
            await buttonHandle.click();
        }

        await page.tracing.stop();

        processRawData(filename, i);

        await browser.close();
    }

    average = average / numberOftests;

    console.log(`\nAverage time for Polymer 2 : ${Math.ceil(average)} ms\n`);

    average = 0;

    for (let i = 0; i < numberOftests; i++) {
        browser = await puppeteer.launch({ headless: true });
        page = await browser.newPage();

        filename = `results/polymer3/delete-todos_${i}.json`;

        await page.goto(`${LOCALHOST}/polymer3/build/es6-bundled/index.html`);

        const inputHandle = await page.evaluateHandle(selectorInput);

        for (let j = 0; j < numberOfCreation; j++) {
            await inputHandle.type('New todo');
            await inputHandle.press('Enter');
        }

        await page.tracing.start({
            path: filename
        });

        for (let j = 0; j < numberOfCreation; j++) {
            const buttonHandle = await page.evaluateHandle(selectorButton);
            await buttonHandle.click();
        }

        await page.tracing.stop();

        processRawData(filename, i);

        await browser.close();
    }

    average = average / numberOftests;

    console.log(`\nAverage time for Polymer 3 : ${Math.ceil(average)} ms\n`);

    average = 0;

    for (let i = 0; i < numberOftests; i++) {
        browser = await puppeteer.launch({ headless: true });
        page = await browser.newPage();

        filename = `results/vue/delete-todos_${i}.json`;

        await page.goto(`${LOCALHOST}/vue.js/dist/index.html`);

        const inputHandle = await page.evaluateHandle(selectorInput);

        for (let j = 0; j < numberOfCreation; j++) {
            await inputHandle.type('New todo');
            await inputHandle.press('Enter');
        }

        await page.tracing.start({
            path: filename
        });

        for (let j = 0; j < numberOfCreation; j++) {
            try {
                const buttonHandle = await page.evaluateHandle(selectorButton);
                if (buttonHandle && buttonHandle.click) {
                    await buttonHandle.click();
                }
            } catch (e) {}
        }

        await page.tracing.stop();

        processRawData(filename, i);

        await browser.close();
    }

    average = average / numberOftests;

    console.log(`\nAverage time for Vue : ${Math.ceil(average)} ms\n`);

    average = 0;

    for (let i = 0; i < numberOftests; i++) {
        browser = await puppeteer.launch();
        page = await browser.newPage();

        filename = `results/svelte/delete-todos_${i}.json`;

        await page.goto(`${LOCALHOST}/svelte/public/index.html`);

        const inputHandle = await page.evaluateHandle(selectorInput);

        for (let j = 0; j < numberOfCreation; j++) {
            await inputHandle.type('New todo');
            await inputHandle.press('Enter');
        }

        await page.tracing.start({
            path: filename
        });

        for (let j = 0; j < numberOfCreation; j++) {
            try {
                const buttonHandle = await page.evaluateHandle(selectorButton);
                if (buttonHandle && buttonHandle.click) {
                    await buttonHandle.click();
                }
            } catch (e) {}
        }

        await page.tracing.stop();

        processRawData(filename, i);

        await browser.close();
    }

    average = average / numberOftests;

    console.log(`\nAverage time for svelte : ${Math.ceil(average)} ms\n`);

    average = 0;

    for (let i = 0; i < numberOftests; i++) {
        browser = await puppeteer.launch();
        page = await browser.newPage();

        filename = `results/lit-element/delete-todos_${i}.json`;

        await page.goto(`${LOCALHOST}/lit-element/dist/index.html`);

        const inputHandle = await page.evaluateHandle(selectorInput);

        for (let j = 0; j < numberOfCreation; j++) {
            await inputHandle.type('New todo');
            await inputHandle.press('Enter');
        }

        await page.tracing.start({
            path: filename
        });

        for (let j = 0; j < numberOfCreation; j++) {
            try {
                const buttonHandle = await page.evaluateHandle(selectorButton);
                if (buttonHandle && buttonHandle.click) {
                    await buttonHandle.click();
                }
            } catch (e) {}
        }

        await page.tracing.stop();

        processRawData(filename, i);

        await browser.close();
    }

    average = average / numberOftests;

    console.log(`\nAverage time for lit-element : ${Math.ceil(average)} ms\n`);

    average = 0;

    for (let i = 0; i < numberOftests; i++) {
        browser = await puppeteer.launch();
        page = await browser.newPage();

        filename = `results/hyperhtml/delete-todos_${i}.json`;

        await page.goto(`${LOCALHOST}/native-shadow-dom_hyperHTML/dist/index.html`);
        const inputHandle = await page.evaluateHandle(selectorInput);

        for (let j = 0; j < numberOfCreation; j++) {
            await inputHandle.type('New todo');
            await inputHandle.press('Enter');
        }

        await page.tracing.start({
            path: filename
        });

        for (let j = 0; j < numberOfCreation; j++) {
            try {
                const buttonHandle = await page.evaluateHandle(selectorButton);
                console.warn('hyper html 2: ' + j);
                if (buttonHandle && buttonHandle.click) {
                    await buttonHandle.click();
                }
            } catch (e) {}
        }

        await page.tracing.stop();

        processRawData(filename, i);

        await browser.close();
    }

    average = average / numberOftests;

    console.log(`\nAverage time for hyperhtml : ${Math.ceil(average)} ms\n`);
})();
