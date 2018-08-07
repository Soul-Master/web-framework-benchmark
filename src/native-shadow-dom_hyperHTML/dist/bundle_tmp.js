import HyperHTMLElement from '../node_modules/hyperhtml-element/esm/index.js';

class MyTodo extends HyperHTMLElement {
    created() {
        this.attachShadow({
            mode: 'open'
        });

        this._list = [{
            id: 0,
            text: 'my initial todo',
            checked: false
        }, {
            id: 1,
            text: 'Learn about Web Components',
            checked: true
        }];

        this._addItem = e => this.addItem(e);
        this._removeItem = e => this.removeItem(e);
        this._toggleItem = e => this.toggleItem(e);

        this.render();
    }

    addItem(e) {
        this._list = [...this._list, {
            id: this._list.length,
            text: e.detail,
            checked: false
        }];
        this.render();
    }

    removeItem(e) {
        this._list.splice(e.detail, 1);
        this.render();
    }

    toggleItem(e) {
        const item = this._list[e.detail];
        this._list[e.detail] = Object.assign({}, item, {
            checked: !item.checked
        });
        this.render();
    }

    render() {
        return this.html `
        <style>
        h1 {
            font-size: 100px;
            font-weight: 100;
            text-align: center;
            color: rgba(175, 47, 47, 0.15);
        }
        
        section {
            background: #fff;
            margin: 130px 0 40px 0;
            position: relative;
            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
        }
        
        #list-container {
            margin: 0;
            padding: 0;
            list-style: none;
            border-top: 1px solid #e6e6e6;
        }
        </style>
        <h1>Todos WC</h1>
        <section>
            <todo-input onsubmit=${this._addItem}></todo-input>
            <ul id="list-container">
            ${
                this._list
                  .map((item, index) => HyperHTMLElement.wire(item)`<todo-item index="${index}" 
                                                                                text="${item.text}" 
                                                                                checked="${item.checked}" 
                                                                                onremoved="${this._removeItem}"
                                                                                onchecked="${this._toggleItem}"></todo-item>`)
              }
            </ul>
        </section>
        `;
    }
}

MyTodo.define('my-todo');


class TodoInput extends HyperHTMLElement {
    created() {
        this.attachShadow({ mode: 'open' });
        
        this.state = {
            value: ''
        };
        this._handleSubmit = e => this.handleSubmit(e);
        this._handleInput = e => this.handleInput(e);

        this.render();
    }

    handleInput(e) {
        this.state = { value: e.target.value };
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.value) return;
        this.dispatchEvent(new CustomEvent('submit', { detail: this.state.value }));
        this.$input = this.shadowRoot.querySelector('#new-todo');
        this.$input.value = '';
        this.$input.blur();
    }

    render() {
        return this.html`
        <style>
        #new-todo-form {
            position: relative;
            font-size: 24px;
            border-bottom: 1px solid #ededed;
        }

        #new-todo {
            padding: 16px 16px 16px 60px;
            border: none;
            background: rgba(0, 0, 0, 0.003);
            position: relative;
            margin: 0;
            width: 100%;
            font-size: 24px;
            font-family: inherit;
            font-weight: inherit;
            line-height: 1.4em;
            border: 0;
            outline: none;
            color: inherit;
            padding: 6px;
            border: 1px solid #CCC;
            box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
            box-sizing: border-box;
        }
    </style>
    <form id="new-todo-form" onsubmit=${this._handleSubmit}>
        <input id="new-todo" type="text" placeholder="What needs to be done?" oninput=${this._handleInput} value="${this.state.value}"/>
    </form>
        `;
    }
}

TodoInput.define('todo-input');


class TodoItem extends HyperHTMLElement {
    created() {
        // this.attachShadow({ mode: 'open' }); // bug with attributeChangedCallback
        
        this._handleOnChecked = e => this.handleOnChecked(e);
        this._handleOnRemoved = e => this.handleOnRemoved(e);

        this.render();
    }

    static get observedAttributes() {
        return ['text', 'checked', 'index'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this[name] = newValue;
        this.render();
    }

    handleOnRemoved(e) {
        this.dispatchEvent(new CustomEvent('removed', { detail: this.index, bubbles: true }));
    }

    handleOnChecked(e) {
        this.dispatchEvent(new CustomEvent('checked', { detail: this.index, bubbles: true }));
    }

    render() {
        if (typeof this.text !== 'string' || typeof this.checked !== 'string') {
            return;
        }
        return this.html`
        <style>
    :host {
        display: block;
    }

    li.item {
        font-size: 24px;
        display: block;
        position: relative;
        border-bottom: 1px solid #ededed;
    }

    li.item input {
        text-align: center;
        width: 40px;
        height: auto;
        position: absolute;
        top: 9px;
        bottom: 0;
        margin: auto 0;
        border: none;
        -webkit-appearance: none;
        appearance: none;
    }

    li.item input:after {
        content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#ededed" stroke-width="3"/></svg>');
    }

    li.item input:checked:after {
        content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#bddad5" stroke-width="3"/><path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/></svg>');
    }

    li.item label {
        white-space: pre;
        word-break: break-word;
        padding: 15px 60px 15px 15px;
        margin-left: 45px;
        display: block;
        line-height: 1.2;
        transition: color 0.4s;
    }

    li.item.completed label {
        color: #d9d9d9;
        text-decoration: line-through;
    }

    li.item button,
        li.item input[type="checkbox"] {
        outline: none;
    }

    li.item button {
        margin: 0;
        padding: 0;
        border: 0;
        background: none;
        font-size: 100%;
        vertical-align: baseline;
        font-family: inherit;
        font-weight: inherit;
        color: inherit;
        -webkit-appearance: none;
        appearance: none;
        -webkit-font-smoothing: antialiased;
        -moz-font-smoothing: antialiased;
        font-smoothing: antialiased;
    }

    li.item .destroy {
        position: absolute;
        top: 0;
        right: 10px;
        bottom: 0;
        width: 40px;
        height: 40px;
        margin: auto 0;
        font-size: 30px;
        color: #cc9a9a;
        margin-bottom: 11px;
        transition: color 0.2s ease-out;
    }

    li.item .destroy:hover {
        color: #af5b5e;
    }
</style>
<li class="item">
    <input type="checkbox" checked=${this.checked === 'true'} onchange=${this._handleOnChecked}>
    <label>${this.text}</label>
    <button class="destroy" onclick=${this._handleOnRemoved}>x</button>
</li>
        `;
    }
}

TodoItem.define('todo-item');