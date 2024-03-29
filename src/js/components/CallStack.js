import { ANIMATION } from "../utils/Constants.js";
import Elements from "./Elements.js";

class CallStack {
	// TODO 각 class -> prototype / 겹치는거 많음 상속으로 변경
	#block;

	constructor(code) {
		this.#block = `<span class="code-box push">${code}</span>`;
	}

	push() {
		Elements.$callStack.innerHTML = this.#block;
		return new Promise((resolve) => setTimeout(() => resolve(), ANIMATION.delay));
	}

	pop() {
		const box = document.querySelector(".call-stack .code-box");
		box.classList.remove("push", "event-loop-push");
		box.classList.add("pop");
		return new Promise((resolve) =>
			setTimeout(() => {
				box.remove();
				resolve();
			}, ANIMATION.delay)
		);
	}

	eventloopPush(box) {
		Elements.$callStack.appendChild(box);
		const callstackBox = document.querySelector(".call-stack .code-box");
		callstackBox.classList.add("event-loop-push");
	}

	toString() {
		return "callstack";
	}
}

export default CallStack;
