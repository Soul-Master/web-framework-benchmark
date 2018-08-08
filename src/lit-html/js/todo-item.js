import { html, render } from '../node_modules/lit-html/lib/lit-extended.js';

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
