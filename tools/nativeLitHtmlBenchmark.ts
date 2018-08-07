import { BenchmarkBase } from './benchmarkBase';

export class NativeLitHtmlBenchmark extends BenchmarkBase {
    name = 'native-shadow-dom_lit-html';
    pageUrl = `/${this.name}/dist/index.html`;
}