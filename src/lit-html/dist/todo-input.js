

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
