import { ANIMATION } from "../utils/Constants.js";
import Elements from "../utils/Elements.js";

class WepAPI {
	#block;

	constructor(code) {
		this.#block = `<span class="code-box goto-wep">${code}</span>`;
	}

	push() {
		Elements.$webAPI.innerHTML = this.#block;
		return new Promise((resolve) => setTimeout(() => resolve(), ANIMATION.delay));
	}

	pop(isMicroQueue) {
        
    }
}

export default WepAPI;
