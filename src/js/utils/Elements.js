const Elements = {
	$textArea: "",
	$excuteBtn: "",
	$codeExcute: "",
	init() {
		[Elements.$textArea, Elements.$excuteBtn] = document.querySelectorAll(".code__input > *");
		Elements.$codeExcute = document.querySelector(".code__excute");
	},
};

export default Elements;
