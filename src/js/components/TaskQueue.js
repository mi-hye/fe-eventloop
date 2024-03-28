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
		box.classList.add("from-task-queue-goto-call-stack");
		return new Promise((resolve) =>
			setTimeout(() => {
				box.classList.remove("from-task-queue-goto-call-stack");
				resolve(box);
				box.remove();
			}, ANIMATION.delay)
		);
	}

	toString() {
		return "taskQueue";
	}
}

export default TaskQueue;
