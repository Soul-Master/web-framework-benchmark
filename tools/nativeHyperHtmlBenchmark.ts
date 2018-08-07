import { BenchmarkBase } from './benchmarkBase';

export class NativeHyperHtmlBenchmark extends BenchmarkBase {
    name = 'native-shadow-dom_hyperHTML';
    pageUrl = `/${this.name}/dist/index.html`;

    selectorButton = `document.querySelector('my-todo').shadowRoot.querySelector('todo-item').querySelector('button')`;
}