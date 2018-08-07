import { BenchmarkBase } from './benchmarkBase';

export class Polymer2Benchmark extends BenchmarkBase {
    name = 'polymer2';
    pageUrl = `/${this.name}/build/es6-bundled/index.html`;
}