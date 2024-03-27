import Parser from "./Parser.js";
import CallStack from "./CallStack.js";
import WebAPI from "./WebAPI.js";
import MicroQueue from "./MicroQueue.js";
import TaskQueue from "./TaskQueue.js";

export async function analyze(code) {
	//FIXME
	const codeLines = Parser.getLines(code);

	for (let i = 0; i < codeLines.length; i++) {
		let codeLine = codeLines[i];
		const api = isWebAPI(codeLine);
		if (api) codeLine = `${api}();`;

		const callstack = new CallStack(codeLine); //이벤트루프가 알아야함
		await callstack.push();

		if (api) {
			//wep이면
			const callback = Parser.matchCallbackFn(codeLines[i]);
			const webApi = new WebAPI(callback);
			await webApi.push(); //wep으로 이동
			await callstack.pop(); // callstack 제거

			if (webApi.isPromise(api)) {
				//promise면 micro로
				webApi.pop();
				const micro = new MicroQueue(callback);
				await micro.push();
			} else {
				webApi.pop();
				const taskQueue = new TaskQueue(callback);
				await taskQueue.push();
			}
			//아니면 task로

			//eventroof에서 callstack
		} else await callstack.pop();
	}
}

function isWebAPI(line) {
	const WEB_API_REGEXP = [/setTimeout/, /setInterval/, /setImmediate/, /Promise/, /then/, /catch/];
	const result = WEB_API_REGEXP.find((regexp) => regexp.test(line));
	if (result) return result.toString().slice(1, -1);
	return false;
}
