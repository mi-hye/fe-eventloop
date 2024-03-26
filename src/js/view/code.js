import Elements from "../utils/Elements.js";

export function addExcuteCode() {
	Elements.$excuteBtn.addEventListener("click", () => {
		Elements.$codeExcute.innerHTML = Elements.$textArea.value;
	});
}
