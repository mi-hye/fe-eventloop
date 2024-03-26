import Elements from "../utils/Elements.js";
import CallStack from "../components/CallStack.js";
import { GREEN_CODE, RED_CODE, BTN_CLASS_NAME } from "../utils/Constants.js";
import Parser from "../components/Parser.js";

const CLASSNAME_MAP = {
	[BTN_CLASS_NAME.green]: () => (Elements.$textArea.value = GREEN_CODE),
	[BTN_CLASS_NAME.red]: () => (Elements.$textArea.value = RED_CODE),
	[BTN_CLASS_NAME.excute]: () => {
		const code = Elements.$textArea.value;
		Elements.$codeExcute.value = code;
		a(code);
	},
};

async function a(code) {
	//FIXME
	// const callstack = new CallStack(splited[0]);
	// callstack.push();
	const codeLines = Parser.getLines(code);
	// for (let i = 0; i < codeLines.length; i++) {
	const codeLine = codeLines[0];
	const callstack = new CallStack(codeLine);

	const bool = Parser.isWepAPI(codeLine);
	await callstack.push();
	if (!bool) {
		await callstack.pop();
	}
	// }
}

export function addCodeExcute() {
	Elements.$buttons.addEventListener("click", ({ target }) => {
		CLASSNAME_MAP[target.className]();
	});
}
