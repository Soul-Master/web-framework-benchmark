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

const numberOftests = 1,
    numberOfCreation = 1,
    selectorInput = `document.querySelector('my-todo').shadowRoot.querySelector('todo-input').shadowRoot.querySelector('input')`,
    selectorItems = `document.querySelector('my-todo').shadowRoot.querySelectorAll('todo-item')`;

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

        filename = `results/native-shadow-dom/edit-todos_${i}.json`;

        await page.goto(`${LOCALHOST}/native-shadow-dom/dist/index.html`);

        await page.setViewport({ width: 800, height: 6000 });

        const inputHandle = await page.evaluateHandle(selectorInput);
        
        for (let j = 0; j < numberOfCreation; j++) {
            await inputHandle.type('New todo');
            await inputHandle.press('Enter');
        }

        await page.tracing.start({
            path: filename
        });

        // Puppeteer doesn't handle easily shadow dom childs -> https://github.com/GoogleChrome/puppeteer/issues/858
        // Edit todos with mouse click and x/y coordinates

        let incrementY = 364;
        for (let j = 0; j < numberOfCreation; j++) {
            await page.mouse.click(140, incrementY);
            incrementY += 59;
        }

        await page.tracing.stop();

        processRawData(filename, i);

        await browser.close();
    }

    average = average / numberOftests;

    console.log(`\nAverage time for native : ${Math.ceil(average)} ms\n`);

    average = 0;

    for (let i = 0; i < numberOftests; i++) {
        browser = await puppeteer.launch({ headless: true, ignoreHTTPSErrors: true });
        page = await browser.newPage();

        filename = `results/native-shadow-dom_lit-html/edit-todos_${i}.json`;

        await page.goto(`${LOCALHOST}/native-shadow-dom_lit-html/dist/index.html`);

        await page.setViewport({ width: 800, height: 6000 });

        const inputHandle = await page.evaluateHandle(selectorInput);

        for (let j = 0; j < numberOfCreation; j++) {
            await inputHandle.type('New todo');
            await inputHandle.press('Enter');
        }

        await page.tracing.start({
            path: filename
        });

        // Puppeteer doesn't handle easily shadow dom childs -> https://github.com/GoogleChrome/puppeteer/issues/858
        // Edit todos with mouse click and x/y coordinates

        let incrementY = 364;
        for (let j = 0; j < numberOfCreation; j++) {
            await page.mouse.click(140, incrementY);
            incrementY += 59;
        }

        await page.tracing.stop();

        processRawData(filename, i);

        await browser.close();
    }

    average = average / numberOftests;

    console.log(`\nAverage time for native + lit-html : ${Math.ceil(average)} ms\n`);

    average = 0;

    for (let i = 0; i < numberOftests; i++) {
        browser = await puppeteer.launch({ headless: true, ignoreHTTPSErrors: true });
        page = await browser.newPage();

        filename = `results/polymer2/edit-todos_${i}.json`;

        await page.goto(`${LOCALHOST}/polymer2/build/es6-bundled/index.html`);

        await page.setViewport({ width: 800, height: 6000 });

        const inputHandle = await page.evaluateHandle(selectorInput);

        for (let j = 0; j < numberOfCreation; j++) {
            await inputHandle.type('New todo');
            await inputHandle.press('Enter');
        }

        await page.tracing.start({
            path: filename
        });

        // Puppeteer doesn't handle easily shadow dom childs -> https://github.com/GoogleChrome/puppeteer/issues/858
        // Edit todos with mouse click and x/y coordinates

        let incrementY = 364;
        for (let j = 0; j < numberOfCreation; j++) {
            await page.mouse.click(140, incrementY);
            incrementY += 59;
        }

        await page.tracing.stop();

        processRawData(filename, i);

        await browser.close();
    }

    average = average / numberOftests;

    console.log(`\nAverage time for Polymer : ${Math.ceil(average)} ms\n`);

    average = 0;

    for (let i = 0; i < numberOftests; i++) {
        browser = await puppeteer.launch({ headless: true, ignoreHTTPSErrors: true });
        page = await browser.newPage();

        filename = `results/polymer3/edit-todos_${i}.json`;

        await page.goto(`${LOCALHOST}/polymer3/build/es6-bundled/index.html`);

        await page.setViewport({ width: 800, height: 6000 });

        const inputHandle = await page.evaluateHandle(selectorInput);

        for (let j = 0; j < numberOfCreation; j++) {
            await inputHandle.type('New todo');
            await inputHandle.press('Enter');
        }

        await page.tracing.start({
            path: filename
        });

        // Puppeteer doesn't handle easily shadow dom childs -> https://github.com/GoogleChrome/puppeteer/issues/858
        // Edit todos with mouse click and x/y coordinates

        let incrementY = 364;
        for (let j = 0; j < numberOfCreation; j++) {
            await page.mouse.click(140, incrementY);
            incrementY += 59;
        }

        await page.tracing.stop();

        processRawData(filename, i);

        await browser.close();
    }

    average = average / numberOftests;

    console.log(`\nAverage time for Polymer 3 : ${Math.ceil(average)} ms\n`);

    average = 0;

    for (let i = 0; i < numberOftests; i++) {
        browser = await puppeteer.launch({ headless: true, ignoreHTTPSErrors: true });
        page = await browser.newPage();

        filename = `results/stencil/edit-todos_${i}.json`;

        await page.goto(`${LOCALHOST}/stencil/www/index.html`, {
            waitUntil: 'domcontentloaded'
        });

        await page.waitFor('#input-submit');

        await page.setViewport({ width: 800, height: 6000 });

        const inputHandle = await page.evaluateHandle(`document.querySelector('todo-input').querySelector('input')`);

        for (let j = 0; j < numberOfCreation; j++) {
            await inputHandle.type('New todo');
            await inputHandle.press('Enter');
        }

        await page.tracing.start({
            path: filename
        });

        // Puppeteer doesn't handle easily shadow dom childs -> https://github.com/GoogleChrome/puppeteer/issues/858
        // Edit todos with mouse click and x/y coordinates

        let incrementY = 364;
        for (let j = 0; j < numberOfCreation; j++) {
            await page.mouse.click(140, incrementY);
            incrementY += 59;
        }

        await page.tracing.stop();

        processRawData(filename, i);

        await browser.close();
    }

    average = average / numberOftests;

    console.log(`\nAverage time for Stencil without PR : ${Math.ceil(average)} ms\n`);

    average = 0;

    for (let i = 0; i < numberOftests; i++) {
        browser = await puppeteer.launch({ headless: true, ignoreHTTPSErrors: true });
        page = await browser.newPage();

        filename = `results/stencil-prerendered/edit-todos_${i}.json`;

        await page.goto(`${LOCALHOST}/stencil/www-prerendered/index.html`, {
            waitUntil: 'domcontentloaded'
        });

        await page.waitFor('#input-submit');

        await page.setViewport({ width: 800, height: 6000 });

        const inputHandle = await page.evaluateHandle(`document.querySelector('todo-input').querySelector('input')`);

        for (let j = 0; j < numberOfCreation; j++) {
            await inputHandle.type('New todo');
            await inputHandle.press('Enter');
        }

        await page.tracing.start({
            path: filename
        });

        // Puppeteer doesn't handle easily shadow dom childs -> https://github.com/GoogleChrome/puppeteer/issues/858
        // Edit todos with mouse click and x/y coordinates

        let incrementY = 364;
        for (let j = 0; j < numberOfCreation; j++) {
            await page.mouse.click(140, incrementY);
            incrementY += 59;
        }

        await page.tracing.stop();

        processRawData(filename, i);

        await browser.close();
    }

    average = average / numberOftests;

    console.log(`\nAverage time for Stencil with PR : ${Math.ceil(average)} ms\n`);

    /*average = 0;

    for (let i = 0; i < numberOftests; i++) {
        browser = await puppeteer.launch({ headless: true, ignoreHTTPSErrors: true })
        page = await browser.newPage();

        filename = `results/angular-elements/edit-todos_${i}.json`;

        await page.goto(`${LOCALHOST}/angular-elements/dist/index.html`);

        await page.setViewport({width: 800, height: 6000});

        const inputHandle = await page.evaluateHandle(selectorInput);

        for (let j = 0; j<numberOfCreation; j++) {            
            await inputHandle.type('New todo');
            await inputHandle.press('Enter');
        }

        await page.tracing.start({
            path: filename
        });

        // Puppeteer doesn't handle easily shadow dom childs -> https://github.com/GoogleChrome/puppeteer/issues/858
        // Edit todos with mouse click and x/y coordinates

        let incrementY = 364;
        for (let j = 0; j<numberOfCreation; j++) {
            await page.mouse.click(140, incrementY);
            incrementY += 59;
        }

        await page.tracing.stop();

        processRawData(filename, i);

        await browser.close();
    }

    average = average / numberOftests;

    console.log(`\nAverage time for Angular elements : ${Math.ceil(average)} ms\n`);*/

    average = 0;

    for (let i = 0; i < numberOftests; i++) {
        browser = await puppeteer.launch({ headless: true, ignoreHTTPSErrors: true });
        page = await browser.newPage();

        filename = `results/vue/edit-todos_${i}.json`;

        await page.goto(`${LOCALHOST}/vue.js/dist/index.html`);

        await page.setViewport({ width: 800, height: 6000 });

        const inputHandle = await page.evaluateHandle(selectorInput);

        for (let j = 0; j < numberOfCreation; j++) {
            await inputHandle.type('New todo');
            await inputHandle.press('Enter');
        }

        await page.tracing.start({
            path: filename
        });

        // Puppeteer doesn't handle easily shadow dom childs -> https://github.com/GoogleChrome/puppeteer/issues/858
        // Edit todos with mouse click and x/y coordinates

        let incrementY = 364;
        for (let j = 0; j < numberOfCreation; j++) {
            await page.mouse.click(140, incrementY);
            incrementY += 59;
        }

        await page.tracing.stop();

        processRawData(filename, i);

        await browser.close();
    }

    average = average / numberOftests;

    console.log(`\nAverage time for Vue : ${Math.ceil(average)} ms\n`);

    average = 0;

    for (let i = 0; i < numberOftests; i++) {
        browser = await puppeteer.launch({ headless: true, ignoreHTTPSErrors: true });
        page = await browser.newPage();

        filename = `results/svelte/edit-todos_${i}.json`;

        await page.goto(`${LOCALHOST}/svelte/public/index.html`);

        await page.setViewport({ width: 800, height: 6000 });

        const inputHandle = await page.evaluateHandle(selectorInput);

        for (let j = 0; j < numberOfCreation; j++) {
            await inputHandle.type('New todo');
            await inputHandle.press('Enter');
        }

        await page.tracing.start({
            path: filename
        });

        // Puppeteer doesn't handle easily shadow dom childs -> https://github.com/GoogleChrome/puppeteer/issues/858
        // Edit todos with mouse click and x/y coordinates

        let incrementY = 364;
        for (let j = 0; j < numberOfCreation; j++) {
            await page.mouse.click(140, incrementY);
            incrementY += 59;
        }

        await page.tracing.stop();

        processRawData(filename, i);

        await browser.close();
    }

    average = average / numberOftests;

    console.log(`\nAverage time for Svelte : ${Math.ceil(average)} ms\n`);

    average = 0;

    for (let i = 0; i < numberOftests; i++) {
        browser = await puppeteer.launch({ headless: true, ignoreHTTPSErrors: true });
        page = await browser.newPage();

        filename = `results/lit-element/edit-todos_${i}.json`;

        await page.goto(`${LOCALHOST}/lit-element/dist/index.html`);

        await page.setViewport({ width: 800, height: 6000 });

        const inputHandle = await page.evaluateHandle(selectorInput);

        for (let j = 0; j < numberOfCreation; j++) {
            await inputHandle.type('New todo');
            await inputHandle.press('Enter');
        }

        await page.tracing.start({
            path: filename
        });

        // Puppeteer doesn't handle easily shadow dom childs -> https://github.com/GoogleChrome/puppeteer/issues/858
        // Edit todos with mouse click and x/y coordinates

        let incrementY = 364;
        for (let j = 0; j < numberOfCreation; j++) {
            await page.mouse.click(140, incrementY);
            incrementY += 59;
        }

        await page.tracing.stop();

        processRawData(filename, i);

        await browser.close();
    }

    average = average / numberOftests;

    console.log(`\nAverage time for lit-element : ${Math.ceil(average)} ms\n`);
})();
