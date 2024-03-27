import { ANIMATION } from "../utils/Constants.js";
import Elements from "../utils/Elements.js";

class TaskQueue {
	#block;

	constructor(code) {
		this.#block = `<span class="code-box goto-task-queue">${code}</span>`;
	}

	push() {
		Elements.$taskQueue.innerHTML = this.#block;
		return new Promise((resolve) => setTimeout(() => resolve(), ANIMATION.delay));
	}

	pop() {
		const box = document.querySelector(".macrotask-queue .code-box");
		box.classList.remove("goto-task-queue");
		box.classList.add("goto-call-stack"); //TODO
		return new Promise((resolve) =>
			setTimeout(() => {
				box.classList.remove("goto-call-stack");
				resolve(box);
			}, ANIMATION.delay)
		);
	}

	toString() {
		return "taskQueue";
	}
}

export default TaskQueue;
