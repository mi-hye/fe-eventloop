import { ANIMATION } from '../utils/Constants.js';

class Memory {
	block;

	constructor(code, className, targetQueue) {
		this.block = `<span class="code-box ${className}">${code}</span>`;
		this.targetQueue = targetQueue;
	}

	push(element) {
		element.innerHTML = this.block;
		return new Promise((resolve) =>
			setTimeout(() => resolve(), ANIMATION.delay)
		);
	}
}

export default Memory;
