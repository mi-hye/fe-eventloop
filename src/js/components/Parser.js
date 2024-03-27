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
		const regexp = /[}|\)](.*)\)/;
		let str = ``;
		for (let t = i; t < splitedCode.length; t++) {
			str += splitedCode[t].trim();
			if (regexp.test(splitedCode[t])) {
				lines.push(str);
				return t;
			}
		}
	},
	matchCallbackFn(line) {
		let callback = line.match(/\(\) => {.*}/)?.[0];
		callback = line.match(/\(.*\)/)?.[0].slice(1, -1);
		return callback;
	},
};

export default Parser;
