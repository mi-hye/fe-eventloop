import Elements from "../utils/Elements.js";
import CallStack from "./CallStack.js";
import { GREEN_CODE, RED_CODE, BTN_CLASS_NAME } from "../utils/Constants.js";

export function addCodeExcute() {
	Elements.$buttons.addEventListener("click", ({ target }) => {
		if (target.className === BTN_CLASS_NAME.green) Elements.$textArea.value = GREEN_CODE;
		if (target.className === BTN_CLASS_NAME.red) Elements.$textArea.value = RED_CODE;
		if (target.className === BTN_CLASS_NAME.excute) {
			const code = Elements.$textArea.value;
			Elements.$codeExcute.value = code;
			// 	a(code);
		}
	});

	// Elements.$excuteBtn.addEventListener("click", () => {
	// 	const code = Elements.$textArea.value;
	// 	Elements.$codeExcute.value = code;
	// 	a(code);
	// });
}

function a(code) {
	const splited = code.split("\n");
	console.log(splited);

	const callstack = new CallStack(splited[0]);
	callstack.push();
}
