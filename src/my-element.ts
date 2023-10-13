import { html, render } from "lit-html";
import { effect, signal } from "usignal";
import { ScreenDetails, ScreenDetailed } from "./types";
import { getContainerSize } from "./utils/get-container-size";
import { sleep } from "./utils/sleep";
import { getScreenSizes } from "./utils/get-screen-sizes";
import { getPermissionState } from "./utils/get-permission-state";
import { getScreenDetails } from "./utils/get-screen-details";
/**
 * An example element.
 */
export class MyElement extends HTMLElement {
  constructor(
    public state = {
      rerender: signal(0),
      supported: signal(false),
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

    this.dispose = effect(() => {
      try {
        this.render();
      } catch (err) {
        console.error(err);
      }
    });

    getPermissionState().then((permission) => {
      const isSupported = permission !== "unsupported";
      this.state.supported.value = isSupported;

      if (isSupported) {
        getScreenDetails().then((details) => {
          this.updateScreens(details);
        });
      }
    });
  }
  disconnectedCallback() {
    this.dispose();
  }

  template() {
    try {
      const screens = getScreenSizes(this.state.screens);
      const screenshtml = screens.map((sizes) => {
        const screen = sizes.screen as ScreenDetailed;
        const bg =
          screen === this.state.currentScreen
            ? {
                default: "bg-orange-700",
                hover: "hover:bg-orange-600",
              }
            : {
                default: "bg-slate-700",
                hover: "hover:bg-slate-600",
              };

        const scaleDown = 10;
        const left = sizes.left / scaleDown;
        const top = sizes.top / scaleDown;

        const width = sizes.width / scaleDown;
        const height = sizes.height / scaleDown;
        const style = `left: ${left}px; top: ${top}px; width: ${width}px; height:${height}px;`;
        return html`
          <button
            class="absolute text-white ${bg.default} ${bg.hover} rounded-sm z-10"
            style="${style}"
            data-label="${screen.label}"
            @click="${() => {
              const screenselected = new CustomEvent("screenselected", {
                detail: { screen: sizes },
              });
              this.dispatchEvent(screenselected);
            }}"
          >
            <p class="w-full text-center">${screen.label}</p>
          </button>
        `;
      });
      return html`<div>
        <h1>Support: ${this.state.supported.value ? "✅" : "❌"}</h1>
        <button
          class="border p-1 hover:bg-slate-400 rounded-sm hover:text-white"
          @click=${() => this.getPermission()}
        >
          Get permission
        </button>
        <pre>${this.state.text.value}</pre>

        <div
          class="chess-pattern relative mx-auto"
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
    const permission = await getPermissionState();
    if (permission === "denied" || permission === "unsupported") {
      return;
    }
    const details = await getScreenDetails();

    details.addEventListener("screenschange", async (_event) => {
      // Screen has changed, but might take some time before
      // window.getScreenDetails gives updated information
      await sleep(1000);
      const details = await getScreenDetails();
      this.updateScreens(details);
    });
    this.updateScreens(details);
  }

  render() {
    render(this.template(), this);
  }

  updateScreens(details: ScreenDetails) {
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

// declare global {
//   interface HTMLElementTagNameMap {
//     "my-element": MyElement;
//   }
// }

function screenToText(currentScreen: ScreenDetailed) {
  return `
  Screens:
  ${currentScreen.label}
  ${currentScreen.width}x${currentScreen.height}
  orientation: ${currentScreen.orientation.angle}
  position: ${currentScreen.left} ${currentScreen.top}
`;
}
