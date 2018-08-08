const puppeteer = require('puppeteer');
const fsx = require('fs-extra');

import * as appServer from './appServer';
import { BenchmarkBase } from './benchmarkBase';
import { NativeBenchmark } from './nativeBenchmark';
import { NativeLitHtmlBenchmark } from './nativeLitHtmlBenchmark';
import { NativeHyperHtmlBenchmark } from './nativeHyperHtmlBenchmark';
import { LitHtmlBenchmark } from './litHtmlBenchmark';
import { SvelteBenchmark } from './svelteBenchmark';
import { Polymer2Benchmark } from './polymer2Benchmark';
import { Polymer3Benchmark } from './polymer3Benchmark';
import { LitElementBenchmark } from './litElementBenchmark';
import { AngularElementsBenchmark } from './angularElementsBenchmark';
import { setTimeout } from 'timers';
//import { VueBenchmark } from './vueBenchmark';

const numberOftests = 1,
    inputDelay: number = undefined,
    numberOfCreation = 10,
    numberOfDeletion = 10;

(async () => {
    const tempFolder = __dirname + '/temp';
    const tempBrowserFolder = tempFolder + '/browser';
    fsx.removeSync(tempBrowserFolder);

    const server = appServer.start();
    const browser = await puppeteer.launch({ 
        headless: false,
        userDataDir: tempBrowserFolder
    });    
    const tasks: BenchmarkBase[] = [
        new NativeBenchmark(inputDelay),
        new NativeLitHtmlBenchmark(inputDelay),
        new NativeHyperHtmlBenchmark(inputDelay),
        new LitHtmlBenchmark(inputDelay),
        new SvelteBenchmark(inputDelay),
        new Polymer2Benchmark(inputDelay),
        new Polymer3Benchmark(inputDelay),
        new LitElementBenchmark(inputDelay),
        new AngularElementsBenchmark(inputDelay),

        // Bug: It removes multiple items at the same time.
        // new VueBenchmark(inputDelay),
    ];

    for(const b of tasks) {
        console.log(`Start ${b.name} benchmark`);
        console.log(`---------------------------`);

        b.init();

        let totalPageLoadTime = 0;

        // Warm-up
        await b.pageLoadTest(browser, 0);

        for (let i = 1; i <= numberOftests; i++) {
            const time = await b.pageLoadTest(browser, i);
            console.log(`load: ${time} ms.`);

            totalPageLoadTime += time;
        }

        const averagePageLoadTime = totalPageLoadTime / numberOftests;

        console.log(`Average time: ${Math.ceil(averagePageLoadTime)} ms\n`);

        let totalCreationTime = 0;

        // Warm-up
        await b.creationTest(browser, 5, 0);

        for (let i = 1; i <= numberOftests; i++) {
            const time = await b.creationTest(browser, numberOfCreation, i);
            console.log(`create ${numberOfCreation} items: ${time} ms.`);

            totalCreationTime += time;
        }

        const averageCreationTime = totalCreationTime / numberOftests;

        console.log(`Average time: ${Math.ceil(averageCreationTime)} ms\n`);

        let totalDeletionTime = 0;

        // Warm-up
        await b.deletionTest(browser, 5, 0);

        for (let i = 1; i <= numberOftests; i++) {
            const time = await b.deletionTest(browser, numberOfDeletion, i);
            console.log(`delete ${numberOfDeletion} items: ${time} ms.`);

            totalDeletionTime += time;
        }

        const average = totalDeletionTime / numberOftests;

        console.log(`Average time: ${Math.ceil(average)} ms\n`);
    }

    await browser.close();
    server.close();

    await new Promise(resolve => {
        // Wait for closing browser process
        setTimeout(() => {
            fsx.removeSync(tempFolder);
        }, 1000);
    });
})();