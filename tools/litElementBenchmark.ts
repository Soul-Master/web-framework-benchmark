import { BenchmarkBase } from './benchmarkBase';

export class LitElementBenchmark extends BenchmarkBase {
    name = 'lit-element';
    pageUrl = `/${this.name}/dist/index.html`;
}