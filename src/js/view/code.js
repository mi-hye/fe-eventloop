import Elements from "../utils/Elements.js";

export function addCodeExcute() {
	Elements.$excuteBtn.addEventListener("click", () => {
		const code = Elements.$textArea.value;
		Elements.$codeExcute.value = code;
	});
}
