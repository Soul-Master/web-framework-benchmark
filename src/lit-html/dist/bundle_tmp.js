import { html, render } from '../node_modules/lit-html/lib/lit-extended.js';
import { repeat } from '../node_modules/lit-html/lib/repeat.js';

class MyTodo extends HTMLElement {
    constructor() {
        super();
        this._root = this;
        // initial state
        this._list = [{ id: 0, text: 'my initial todo', checked: false }, { id: 1, text: 'Learn about Web Components', checked: true }];

        this._addItem = e => this.addItem(e);
        this._removeItem = e => this.removeItem(e);
        this._toggleItem = e => this.toggleItem(e);
    }

    render() {
        return html`
<h1>Todos WC</h1>
<section>
    <todo-input on-submit=${this._addItem}></todo-input>
    <ul id="list-container">
        ${repeat(
            this._list,
            item => item.id,
            (item, index) => html`<todo-item 
                                    text="${item.text}" 
                                    checked="${item.checked}" 
                                    index="${index}" 
                                    on-removed=${this._removeItem}
                                    on-checked=${this._toggleItem}></todo-item>`
        )}
    </ul>
</section>`;
    }

    connectedCallback() {
        this._render();
    }

    addItem(e) {
        this._list = [...this._list, { id: this._list.length, text: e.detail, checked: false }];
        this._render();
    }

    removeItem(e) {
        this._list = [...this._list.slice(0, e.detail), ...this._list.slice(e.detail + 1)];
        this._render();
    }

    toggleItem(e) {
        const item = this._list[e.detail];
        this._list[e.detail] = Object.assign({}, item, { checked: !item.checked });
        this._render();
    }

    _render() {
        render(this.render(), this._root);
    }
}

window.customElements.define('my-todo', MyTodo);



class TodoInput extends HTMLElement {
    constructor() {
        super();
        this._root = this;
        this.state = {
            value: ''
        };
        this._handleSubmit = e => this.handleSubmit(e);
        this._handleInput = e => this.handleInput(e);
    }

    render() {
        return html`
<form id="new-todo-form" on-submit=${this._handleSubmit}>
    <input id="new-todo" type="text" placeholder="What needs to be done?" on-input=${this._handleInput} value="${this.state.value}"/>
</form>`;
    }

    handleInput(e) {
        this.state = { value: e.target.value };
    }

    handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (!this.state.value) return;
        this.dispatchEvent(new CustomEvent('submit', { detail: this.state.value }));
        this.$input = this._root.querySelector('#new-todo');
        this.$input.value = '';
        this.$input.blur();
    }

    connectedCallback() {
        render(this.render(), this._root);
    }
}

window.customElements.define('todo-input', TodoInput);



class TodoItem extends HTMLElement {
    constructor() {
        super();
        this._root = this;
        this._checked = false;
        this._text = '';

        this._handleOnChecked = e => this.handleOnChecked(e);
        this._handleOnRemoved = e => this.handleOnRemoved(e);
    }

    render() {
        return html`
<li class="item">
    <input type="checkbox" checked=${this.checked} on-change=${this._handleOnChecked}>
    <label>${this.text}</label>
    <button class="destroy" on-click=${this._handleOnRemoved}>x</button>
</li>`;
    }

    handleOnRemoved(e) {
        this.dispatchEvent(new CustomEvent('removed', { detail: this.index }));
    }

    handleOnChecked(e) {
        this.dispatchEvent(new CustomEvent('checked', { detail: this.index }));
    }

    connectedCallback() {
        // Workaround for lit-html
        setTimeout(() => {
            render(this.render(), this._root);
        }, 0);
    }
}

window.customElements.define('todo-item', TodoItem);
