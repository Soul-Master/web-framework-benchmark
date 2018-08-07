import { BenchmarkBase } from './benchmarkBase';

export class NativeBenchmark extends BenchmarkBase {
    name = 'native-shadow-dom';
    pageUrl = `/${this.name}/dist/index.html`;
}