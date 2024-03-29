import { ANIMATION } from "../utils/Constants.js";
import Elements from "./Elements.js";

async function excuteEventLoop(memories) {
	//TODO refactor
	if (!memories.callstack.length && memories.microQueue.length) {
		Elements.$eventLoop.classList.add("excute");
		//스택이 비어있고 마이크로 큐가 비어있지 않으면 실행
		for (const memory of memories.microQueue) {
			const block = await memories.pop(memory);
			memories.callStackPush(block);
		}
	}

	if (!memories.callstack.length && memories.taskQueue.length) {
		Elements.$eventLoop.classList.add("excute");
		//스택이 비어있고 테스크 큐가 비어있지 않으면 실행
		for (const memory of memories.taskQueue) {
			const block = await memories.pop(memory);
			memories.callStackPush(block);
		}
	}

	return new Promise((resolve) =>
		setTimeout(() => {
			Elements.$eventLoop.classList.remove("excute");
			resolve();
		}, ANIMATION.delay)
	);
}

export default excuteEventLoop;
