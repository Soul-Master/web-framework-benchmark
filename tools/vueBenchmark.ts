import { BenchmarkBase } from './benchmarkBase';

export class VueBenchmark extends BenchmarkBase {
    name = 'vue';
    pageUrl = `/${this.name}/dist/index.html`;
}