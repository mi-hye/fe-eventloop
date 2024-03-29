import { ANIMATION } from "../utils/Constants.js";
import Elements from "./Elements.js";

function WebAPI(code) {
	const $span = document.createElement("span");
	$span.innerHTML = `${code}`;
	$span.classList.add("code-box", "goto-web");
	this.block = $span;
}

WebAPI.prototype.push = () => {
	Elements.$webAPI.prepend(this.block);
	return new Promise((resolve) => setTimeout(() => resolve(), ANIMATION.delay));
};

WebAPI.prototype.pop = () => {
	const block = document.querySelector(".web-api .code-box");
	setTimeout(() => block.remove());
	return block.innerHTML;
};

WebAPI.prototype.isPromise = (api) => {
	const WEP_API = ["Promise", "then", "catch"];
	return WEP_API.includes(api);
};

WebAPI.prototype.toString = () => "webApi";

export default WebAPI;
