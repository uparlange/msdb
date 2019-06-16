import LogUtils from "./LogUtils.js";

class AbstractClass {
	static getAnnotations() {
		return undefined;
	}
	constructor() {
		this._logger = LogUtils.getLogger(this.getClassName());
		this.getLogger().debug("constructor");
	}
	getLogger() {
		return this._logger;
	}
	getClassName() {
		return this.constructor.name;
	}
}

export default AbstractClass;