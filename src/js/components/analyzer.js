import Parser from "./Parser.js";
import CallStack from "./CallStack.js";
import WebAPI from "./WebAPI.js";
import MicroQueue from "./MicroQueue.js";
import TaskQueue from "./TaskQueue.js";
import excuteEventLoop from "./EventLoop.js";

const memories = {
	callstack: [],
	microQueue: [],
	taskQueue: [],
	async push(memory) {
		memories[memory.toString()].push(memory);
		await memory.push();
	},
	async pop(memory) {
		memories[memory.toString()].pop();
		return await memory.pop();
	},
	async callStackPush(block) {
		const callstack = new CallStack();
		memories.callstack.push(callstack);
		await callstack.eventloopPush(block);
	},
};

export async function analyze(code) {
	//FIXME
	const codeLines = Parser.getLines(code);

	for (let i = 0; i < codeLines.length; i++) {
		let codeLine = codeLines[i];
		const api = isWebAPI(codeLine);
		if (api) codeLine = `${api}();`;

		const callstack = new CallStack(codeLine);
		await memories.push(callstack);

		if (api) {
			await webAPI(api, callstack, codeLines, i);
		} //else await memories.pop(callstack);

		//eventroof가 callstack이 비어있으면 큐에 있는 애들 이동
		await excuteEventLoop(memories);

		if (memories.callstack.length)
			memories.callstack.forEach(async (memory) => await memories.pop(memory));
	}
}

function isWebAPI(line) {
	const WEB_API_REGEXP = [/setTimeout/, /setInterval/, /setImmediate/, /Promise/, /then/, /fetch/];
	const result = WEB_API_REGEXP.find((regexp) => regexp.test(line));
	if (result) return result.toString().slice(1, -1);
	return false;
}

async function webAPI(api, callstack, codeLines, i) {
	if (api === "fetch") {
		await memories.pop(callstack);
		return;
	}

	//wep이면
	const callback = Parser.matchCallbackFn(codeLines[i]);
	const webApi = new WebAPI(callback);
	await webApi.push(); //wep으로 이동
	await memories.pop(callstack); // callstack 제거

	if (webApi.isPromise(api)) {
		//promise면 micro로
		webApi.pop();
		const micro = new MicroQueue(callback);
		await memories.push(micro);
		// await micro.push();
	}

	if (i === codeLines.length - 1) {
		//아니면 task로
		webApi.pop();
		const taskQueue = new TaskQueue(callback);
		await memories.push(taskQueue);
		// await taskQueue.push();
	}
}
