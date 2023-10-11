import { html, render } from "lit-html";
import { effect, signal } from "usignal";
/**
 * An example element.
 */
export class MyElement extends HTMLElement {
  constructor(
    public state = {
      count: signal(0),
    },
    public dispose = () => {},
  ) {
    super();

    setInterval(() => {
      this.state.count.value++;
    }, 100);
  }
  connectedCallback() {
    this.innerHTML = "";

    this.dispose = effect(() => {
      this.render();
    });
  }
  disconnectedCallback() {
    this.dispose();
  }
  template() {
    return html`<div>
      <h1>Count: ${this.state.count}</h1>
    </div>`;
  }

  render() {
    render(this.template(), this);
  }
}

customElements.define("my-element", MyElement);

declare global {
  interface HTMLElementTagNameMap {
    "my-element": MyElement;
  }
}
