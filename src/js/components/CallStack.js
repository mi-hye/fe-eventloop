import { ANIMATION } from "../utils/Constants.js";
import Elements from "../utils/Elements.js";

class CallStack {
	// TODO 각 class -> prototype / 겹치는거 많음 상속으로 변경
	#block;

	constructor(code) {
		this.#block = `<span class="code-box push">${code}</span>`;
	}

	//TODO flag = true
	push() {
		Elements.$callStack.innerHTML = this.#block;
		const box = document.querySelector(".call-stack .code-box");
		// if (flag) box.classList.add("push");
		// else box.classList.add("from-to-queue");
		return new Promise((resolve) => setTimeout(() => resolve(), ANIMATION.delay));
	}

	pop() {
		const box = document.querySelector(".call-stack .code-box");
		box.classList.remove("push");
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
		callstackBox.classList.add("pop");
		// box.remove();
		return new Promise((resolve) =>
			setTimeout(() => {
				callstackBox.remove();
				resolve();
			}, ANIMATION.delay)
		);
	}

	toString() {
		return "callstack";
	}
}

export default CallStack;
