import { BenchmarkBase } from './benchmarkBase';

export class LitHtmlBenchmark extends BenchmarkBase {
    name = 'lit-html';
    pageUrl = `/${this.name}/dist/index.html`;
    selectorInput = `document.querySelector('my-todo').querySelector('todo-input').querySelector('input')`;
    selectorButton = `document.querySelector('my-todo').querySelector('todo-item').querySelector('button')`;
}