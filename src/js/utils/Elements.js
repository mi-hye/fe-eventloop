const Elements = {
	$textArea: "",
	$buttons: "",
	$codeExcute: "",
	$callStack: "",
	init() {
		Elements.$buttons = document.querySelector(".code__input__btn");
		Elements.$textArea = document.querySelector(".code__input > textarea");
		Elements.$codeExcute = document.querySelector(".code__excute");
		Elements.$callStack = document.querySelector(".call-stack > .box");
	},
};

export default Elements;
