import { ANIMATION } from "../utils/Constants.js";
import Elements from "../utils/Elements.js";

class MicroQueue {
	#block;

	constructor(code) {
		this.#block = `<span class="code-box goto-micro">${code}</span>`;
	}

	push() {
		Elements.$micro.innerHTML = this.#block;
		return new Promise((resolve) => setTimeout(() => resolve(), ANIMATION.delay));
	}

	pop(isMicroQueue) {
        
    }
}

export default MicroQueue;
