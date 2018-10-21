import AbstractClass from "./AbstractClass.js";
import AppUtils from "./AppUtils.js";

class AbstractModule extends AbstractClass {
	static getAnnotations(params) {
		return [
			new ng.core.NgModule(params)
		];
	}
	static getLazyModule(moduleName) {
		return function () {
			return AppUtils.import(`/js/${moduleName}.js`);
		};
	}
	constructor() {
		super();
	}
}

export default AbstractModule;