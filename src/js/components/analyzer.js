import Parser from "./Parser.js";
import CallStack from "./CallStack.js";

export async function analyze(code) {
	//FIXME
	const codeLines = Parser.getLines(code);
	// for (let i = 0; i < codeLines.length; i++) {
	const codeLine = codeLines[0];
	const callstack = new CallStack(codeLine);

	const bool = isWepAPI(codeLine);
	await callstack.push();
	if (!bool) {
		await callstack.pop();
	}
	// }
}

function isWepAPI(line) {
	const WEB_API_REGEXP = [/setTimeout/, /setInterval/, /setImmediate/];
	const result = WEB_API_REGEXP.find((regexp) => regexp.test(line));
	if (result) return result.toString().slice(1, -1);
	return false;
}

function matchCallbackFn(line) {
	return line.match(/\(\) => {.*}/)[0];
}
