import LogUtils from "./LogUtils.js";

class AbstractClass {
	static getAnnotations() {
		return undefined;
	}
	static getParameters() {
		const argumentsCount = arguments.length;
		if (argumentsCount > 0) {
			const params = [];
			for (let i = 0; i < argumentsCount; i++) {
				params.push([arguments[i]]);
			}
			return params;
		} else {
			return undefined;
		}
	}
	constructor() {
		this._logger = LogUtils.getLogger(this.constructor.name);
		this.getLogger().debug("constructor");
	}
	getLogger() {
		return this._logger;
	}
}

export default AbstractClass;