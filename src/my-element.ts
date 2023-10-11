import { html, render } from "lit-html";
import { effect, signal } from "usignal";
import { ScreenDetails, ScreenDetailed } from "./types";
import { getContainerSize } from "./utils/get-container-size";
import { sleep } from "./utils/sleep";
import { getDisplaySize } from "./utils/get-display-size";
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
      try {
        this.render();
      } catch (err) {
        console.error(err);
      }
    });
  }
  disconnectedCallback() {
    this.dispose();
  }

  template() {
    try {
      const screens = getDisplaySize(this.state.screens);
      const screenshtml = screens.map((screen) => {
        const bg =
          screen.label === this.state.currentScreen.label
            ? {
                default: "bg-orange-700",
                hover: "hover:bg-orange-600",
              }
            : {
                default: "bg-slate-700",
                hover: "hover:bg-slate-600",
              };

        const scaleDown = 10;
        const left = screen.left / scaleDown;
        const top = screen.top / scaleDown;

        const width = screen.width / scaleDown;
        const height = screen.height / scaleDown;
        const style = `left: ${left}px; top: ${top}px; width: ${width}px; height:${height}px;`;
        return html`
          <button
            class="absolute text-white ${bg.default} ${bg.hover} rounded-md"
            style="${style}"
            data-label="${screen.label}"
            @click="${() => {
              const screenselected = new CustomEvent("screenselected", {
                detail: { screen },
              });
              this.dispatchEvent(screenselected);
            }}"
          >
            <p class="w-full text-center">${screen.label}</p>
          </button>
        `;
      });
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
          style="width: ${this.state.containerSize.value
            .width}px; height: ${this.state.containerSize.value.height}px;"
        >
          ${screenshtml}
        </div>
      </div>`;
    } catch (err) {
      console.error(err);
    }
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

      details.addEventListener("screenschange", async (event) => {
        // Screen has changed, but might take some time before
        // window.getScreenDetails gives updated information
        await sleep(2000);
        console.log("screenschange", event);
        //@ts-expect-error
        const details: ScreenDetails = await window.getScreenDetails();
        this.updateScreens(details);
      });
      this.updateScreens(details);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    render(this.template(), this);
  }

  updateScreens(details: ScreenDetails) {
    console.log(details);
    this.state.screens = details.screens;
    this.state.currentScreen = details.currentScreen;
    this.state.text.value = `
    ${details.screens.map((screen) => screenToText(screen))}
  `;

    this.state.containerSize.value = getContainerSize(details.screens, {
      scaleDown: 10,
    });
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
