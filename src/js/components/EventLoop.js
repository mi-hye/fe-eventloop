import { ANIMATION } from "../utils/Constants.js";
import Elements from "../utils/Elements.js";
import CallStack from "./CallStack.js";

function excuteEventLoop(memories) {
	if (!memories.callstack.length && memories.microQueue.length) {
		Elements.$eventLoop.classList.add("excute");
		//스택이 비어있고 마이크로 큐가 비어있지 않으면 실행
	} else {
		Elements.$eventLoop.classList.add("excute");
		let box;
		memories.taskQueue.forEach(async (memory) => {
			box = await memory.pop();
			const callstack = new CallStack();
			await callstack.eventloopPush(box);
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
