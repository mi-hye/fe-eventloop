import Parser from "./Parser.js";
import CallStack from "./CallStack.js";
import WebAPI from "./WebAPI.js";
import MicroQueue from "./MicroQueue.js";
import TaskQueue from "./TaskQueue.js";
import excuteEventLoop from "./EventLoop.js";
import { PARSER } from "../utils/Constants.js";

const memories = {
	callstack: [],
	microQueue: [],
	taskQueue: [],
	webApi: [],
	async push(memory) {
		memories[memory.toString()].push(memory);
		await memory.push();
	},
	async pop(memory) {
		const block = await memory.pop();
		memories[memory.toString()].pop();
		return block;
	},
	callStackPush(block) {
		const callstack = new CallStack();
		memories.callstack.push(callstack);
		callstack.eventloopPush(block);
	},
};

export async function analyze(code) {
	//FIXME
	const codeLines = Parser.getLines(code);

	for (let i = 0; i <= codeLines.length; i++) {
		let codeLine = codeLines[i];
		const api = Parser.isWebAPI(codeLine);
		if (api) codeLine = `${api}();`;

		const callstack = new CallStack(codeLine);
		if (i < codeLines.length) await memories.push(callstack);

		if (api) await webAPI(api, callstack, codeLines, i);

		if (i === codeLines.length) {
			//아니면 task로
			if (memories.webApi.length)
				for (const memory of memories.webApi) {
					const block = await memories.pop(memory);
					const taskQueue = new TaskQueue(block);
					await memories.push(taskQueue);
				}
		}

		//eventroof가 callstack이 비어있으면 큐에 있는 애들 이동
		await excuteEventLoop(memories);

		if (memories.callstack.length)
			for (const memory of memories.callstack) {
				await memories.pop(memory);
			}
	}
}

async function webAPI(api, callstack, codeLines, i) {
	if (api === PARSER.FETCH || api === PARSER.CATCH) {
		await memories.pop(callstack);
		return;
	}

	//wep이면
	const callback = Parser.matchCallbackFn(codeLines[i]);
	const webApi = new WebAPI(callback);
	await memories.push(webApi);
	await memories.pop(callstack); // callstack 제거

	if (webApi.isPromise(api)) {
		//promise면 micro로
		await memories.pop(webApi);
		const micro = new MicroQueue(callback);
		await memories.push(micro);
	}
}
