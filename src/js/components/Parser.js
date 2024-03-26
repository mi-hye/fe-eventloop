const Parser = {
	getLines(code) {
		const splitedCode = code.split("\n").filter((v) => v);
		const lines = [];
		for (let i = 0; i < splitedCode.length; i++) {
			if (splitedCode[i].endsWith(");")) lines.push(splitedCode[i]);
			else i = Parser.hasCallBack(i, splitedCode, lines);
		}
		return lines;
	},
	hasCallBack(i, splitedCode, lines) {
		const regexp = /}(.*)\)/;
		let str = ``;
		for (let t = i; t < splitedCode.length; t++) {
			str += splitedCode[t].trim();
			if (regexp.test(splitedCode[t])) {
				lines.push(str);
				return t;
			}
		}
	},
	isWepAPI(line) {
		const WEB_API_REGEXP = [/setTimeout/, /setInterval/, /setImmediate/];
		const result = WEB_API_REGEXP.find((regexp) => regexp.test(line));
		if (result) return result.toString().slice(1, -1);
		return false;
	},
};

export default Parser;
