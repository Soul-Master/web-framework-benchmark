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

const numberOftests = 1;

const LOCALHOST = 'http://localhost:3000';

let browser;
let page;
let average = 0;
let filename;

let processRawData = (filename, i) => {
    let events = require('fs').readFileSync(filename, 'utf8');
    try {
        var model = new DevtoolsTimelineModel(events);
        var topDown = model.topDown();
        average += topDown.totalTime;
        // console.log(`Top down tree total time ${i}: ${Math.ceil(topDown.totalTime)}`);
    } catch (e) {
        // console.log(e);
    }
};

(async () => {
    average = 0;

    for (let i = 0; i < numberOftests; i++) {
        browser = await puppeteer.launch();
        page = await browser.newPage();

        filename = `results/native-shadow-dom/load-page_${i}.json`;

        await page.tracing.start({
            path: filename
        });
        await page.goto(`${LOCALHOST}/native-shadow-dom/dist/index.html`);
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

        filename = `results/native-shadow-dom_lit-html/load-page_${i}.json`;

        await page.tracing.start({
            path: filename
        });
        await page.goto(`${LOCALHOST}/native-shadow-dom_lit-html/dist/index.html`);
        await page.tracing.stop();

        processRawData(filename, i);

        await browser.close();
    }

    average = average / numberOftests;

    console.log(`\nAverage time for native + lit-html : ${Math.ceil(average)} ms\n`);

    average = 0;

    for (let i = 0; i < numberOftests; i++) {
        browser = await puppeteer.launch();
        page = await browser.newPage();

        filename = `results/polymer2/load-page_${i}.json`;

        await page.tracing.start({
            path: filename
        });
        await page.goto(`${LOCALHOST}/polymer2/build/es6-bundled/index.html`);
        await page.tracing.stop();

        processRawData(filename, i);

        await browser.close();
    }

    average = average / numberOftests;

    console.log(`\nAverage time for Polymer 2 : ${Math.ceil(average)} ms\n`);

    average = 0;

    for (let i = 0; i < numberOftests; i++) {
        browser = await puppeteer.launch();
        page = await browser.newPage();

        filename = `results/polymer3/load-page_${i}.json`;

        await page.tracing.start({
            path: filename
        });
        await page.goto(`${LOCALHOST}/polymer3/build/es6-bundled/index.html`);
        await page.tracing.stop();

        processRawData(filename, i);

        await browser.close();
    }

    average = average / numberOftests;

    console.log(`\nAverage time for Polymer 3 : ${Math.ceil(average)} ms\n`);

    average = 0;

    for (let i = 0; i < numberOftests; i++) {
        browser = await puppeteer.launch()
        page = await browser.newPage();

        filename = `results/angular-elements/load-page_${i}.json`;

        await page.tracing.start({
            path: filename
        });
        await page.goto(`${LOCALHOST}/angular-elements/dist/index.html`);
        await page.tracing.stop();

        processRawData(filename, i);

        await browser.close();
    }

    average = average / numberOftests;

    console.log(`\nAverage time for Angular elements : ${Math.ceil(average)} ms\n`);

    average = 0;

    for (let i = 0; i < numberOftests; i++) {
        browser = await puppeteer.launch();
        page = await browser.newPage();

        filename = `results/vue/load-page_${i}.json`;

        await page.tracing.start({
            path: filename
        });
        await page.goto(`${LOCALHOST}/vue.js/dist/index.html`);
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

        filename = `results/svelte/load-page_${i}.json`;

        await page.tracing.start({
            path: filename
        });
        await page.goto(`${LOCALHOST}/svelte/public/index.html`);
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

        filename = `results/lit-element/load-page_${i}.json`;

        await page.tracing.start({
            path: filename
        });
        await page.goto(`${LOCALHOST}/lit-element/dist/index.html`);
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

        filename = `results/hyperhtml/load-page_${i}.json`;

        await page.tracing.start({
            path: filename
        });
        await page.goto(`${LOCALHOST}/native-shadow-dom_hyperHTML/dist/index.html`);
        await page.tracing.stop();

        processRawData(filename, i);

        await browser.close();
    }

    average = average / numberOftests;

    console.log(`\nAverage time for hyperhtml : ${Math.ceil(average)} ms\n`);
})();
