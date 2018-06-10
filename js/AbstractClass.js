import LogUtils from "./LogUtils.js";

class AbstractClass {
	static getAnnotations() {
		return undefined;
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