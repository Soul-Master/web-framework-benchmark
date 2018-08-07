import { BenchmarkBase } from './benchmarkBase';

export class AngularElementsBenchmark extends BenchmarkBase {
    name = 'angular-elements';
    pageUrl = `/${this.name}/dist/index.html`;
}