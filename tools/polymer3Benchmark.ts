import { BenchmarkBase } from './benchmarkBase';

export class Polymer3Benchmark extends BenchmarkBase {
    name = 'polymer3';
    pageUrl = `/${this.name}/build/es6-bundled/index.html`;
}