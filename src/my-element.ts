import { html, render } from "lit-html";
import { effect, signal } from "usignal";
import { ScreenDetails, ScreenDetailed } from "./types";
import { getContainerSize } from "./utils/get-container-size";
/**
 * An example element.
 */
export class MyElement extends HTMLElement {
  constructor(
    public state = {
      count: signal(0),
      text: signal(""),
      currentScreen: {} as ScreenDetailed,
      screens: [] as ScreenDetailed[],
      containerSize: signal({
        width: 10,
        height: 10,
      }),
    },
    public dispose = () => {},
  ) {
    super();
  }
  connectedCallback() {
    this.innerHTML = "";
    // //@ts-expect-error
    // const screenDetails = window.getScreenDetails().then((e) => {
    //   console.log(e);
    //   this.state.text.value = JSON.stringify(e, null, 2);
    // });
    this.dispose = effect(() => {
      console.log("re-render", this.state);
      this.render();
    });
  }
  disconnectedCallback() {
    this.dispose();
  }

  template() {
    return html`<div>
      <h1>Count: ${this.state.count.value}</h1>
      <button
        class="border p-1 hover:bg-slate-400 rounded-sm hover:text-white"
        @click=${() => this.getPermission()}
      >
        Get permission
      </button>
      <pre>${this.state.text.value}</pre>

      <div
        class="relative bg-slate-300 mx-auto"
        style="width: ${this.state.containerSize.value.width}px; height: ${this
          .state.containerSize.value.height}px;"
      >
        ${this.state.screens.map((screen) => {
          const bg =
            screen === this.state.currentScreen
              ? "bg-orange-800"
              : "bg-slate-700";

          const scaleDown = 10;
          const left = screen.left / scaleDown;
          const top = screen.top / scaleDown;

          const width = screen.width / scaleDown;
          const height = screen.height / scaleDown;
          const style = `left: ${left}px; top: ${top}px; width: ${width}px; height:${height}px;`;
          return html`
            <div class="absolute text-white ${bg}" style="${style}">
              <p class="w-full text-center">${screen.label}</p>
            </div>
          `;
        })}
      </div>
    </div>`;
  }
  async getPermission() {
    try {
      const permission =
        //@ts-expect-error
        (await navigator.permissions.query({ name: "window-management" }))
          .state;
      console.log({ permission });
      //@ts-expect-error
      const details: ScreenDetails = await window.getScreenDetails();
      console.log(details);
      this.state.screens = details.screens;
      this.state.currentScreen = details.currentScreen;
      this.state.text.value = `
      ${details.screens.map((screen) => screenToText(screen))}
    `;

      this.state.containerSize.value = getContainerSize(details.screens, {
        scaleDown: 10,
      });
    } catch (err) {
      console.log(err);
    }
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

function screenToText(currentScreen: ScreenDetailed) {
  return `
  Screens:
  ${currentScreen.label}
  ${currentScreen.width}x${currentScreen.height}
  orientation: ${currentScreen.orientation.angle}
  position: ${currentScreen.left} ${currentScreen.top}
`;
}
