import { ANIMATION } from "../utils/Constants.js";
import Elements from "./Elements.js";

class WebAPI {
	#block;

	constructor(code) {
		const $span = document.createElement("span");
		$span.innerHTML = `${code}`;
		$span.classList.add("code-box", "goto-web");
		this.#block = $span;
	}

	push() {
		Elements.$webAPI.prepend(this.#block);
		return new Promise((resolve) => setTimeout(() => resolve(), ANIMATION.delay));
	}

	pop() {
		const block = document.querySelector(".web-api .code-box");
		setTimeout(() => block.remove());
		return block.innerHTML;
	}

	isPromise(api) {
		const WEP_API = ["Promise", "then", "catch"];
		return WEP_API.includes(api);
	}

	toString() {
		return "webApi";
	}
}

export default WebAPI;
