import { BenchmarkBase } from './benchmarkBase';

export class SvelteBenchmark extends BenchmarkBase {
    name = 'svelte';
    pageUrl = `/${this.name}/public/index.html`;
}