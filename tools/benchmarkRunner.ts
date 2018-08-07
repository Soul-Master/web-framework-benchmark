const puppeteer = require('puppeteer');

import { BenchmarkBase } from './benchmarkBase';
import { NativeBenchmark } from './nativeBenchmark';
import { NativeLitHtmlBenchmark } from './nativeLitHtmlBenchmark';
import { NativeHyperHtmlBenchmark } from './nativeHyperHtmlBenchmark';
import { SvelteBenchmark } from './svelteBenchmark';
import { Polymer2Benchmark } from './polymer2Benchmark';
import { Polymer3Benchmark } from './polymer3Benchmark';
import { VueBenchmark } from './vueBenchmark';
import { LitElementBenchmark } from './litElementBenchmark';
import { AngularElementsBenchmark } from './angularElementsBenchmark';

const numberOftests = 2,
    inputDelay: number = undefined,
    numberOfCreation = 2,
    numberOfDeletion = 2,
    appUrl = 'http://localhost:3000';

(async () => {
    const browser = await puppeteer.launch({ headless: false });    
    const tasks: BenchmarkBase[] = [
        new NativeBenchmark(inputDelay),
        new NativeLitHtmlBenchmark(inputDelay),
        new NativeHyperHtmlBenchmark(inputDelay),
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

        let totalCreationTime = 0;

        for (let i = 0; i < numberOftests; i++) {
            const time = await b.creationTest(browser, numberOfCreation, i);
            console.log(`create ${numberOfCreation} items: ${time} ms.`);

            totalCreationTime += time;
        }

        const averageCreationTime = totalCreationTime / numberOftests;

        console.log(`Average time: ${Math.ceil(averageCreationTime)} ms\n`);

        let totalDeletionTime = 0;

        for (let i = 0; i < numberOftests; i++) {
            const time = await b.deletionTest(browser, numberOfDeletion, i);
            console.log(`delete ${numberOfDeletion} items: ${time} ms.`);

            totalDeletionTime += time;
        }

        const average = totalDeletionTime / numberOftests;

        console.log(`Average time: ${Math.ceil(average)} ms\n`);
    }

    await browser.close();
})();