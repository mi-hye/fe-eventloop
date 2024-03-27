const Elements = {
	$textArea: "",
	$buttons: "",
	$codeExcute: "",
	$callStack: "",
	$webAPI: "",
	init() {
		Elements.$buttons = document.querySelector(".code__input__btn");
		Elements.$textArea = document.querySelector(".code__input > textarea");
		Elements.$codeExcute = document.querySelector(".code__excute");
		Elements.$callStack = document.querySelector(".call-stack > .box");
		Elements.$webAPI = document.querySelector(".web-api > .box");
	},
};

export default Elements;
