import { ANIMATION } from "../utils/Constants.js";
import Elements from "../utils/Elements.js";
import CallStack from "./CallStack.js";

function excuteEventLoop(memories) {
	//TODO refactor
	if (!memories.callstack.length && memories.microQueue.length) {
		Elements.$eventLoop.classList.add("excute");
		//스택이 비어있고 마이크로 큐가 비어있지 않으면 실행
		memories.microQueue.forEach(async (memory) => {
			const block = await memories.pop(memory);
			await memories.callStackPush(block);
		});
	}

	if (!memories.callstack.length && memories.taskQueue.length) {
		//스택이 비어있고 테스크 큐가 비어있지 않으면 실행
		Elements.$eventLoop.classList.add("excute");
		memories.taskQueue.forEach(async (memory) => {
			const block = await memories.pop(memory);
			await memories.callStackPush(block);
		});
	}

	return new Promise((resolve) =>
		setTimeout(() => {
			Elements.$eventLoop.classList.remove("excute");
			resolve();
		}, ANIMATION.delay)
	);
}

export default excuteEventLoop;
