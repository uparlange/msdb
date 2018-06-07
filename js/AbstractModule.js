import AbstractClass from "./AbstractClass.js";

class AbstractModule extends AbstractClass {
	static getAnnotations(params) {
		return [
			new ng.core.NgModule(params)
		];
	}
	static getLazyModule(moduleName) {
		return function () {
			const eventEmitter = new ng.core.EventEmitter();
			const modulePath = "/js/" + moduleName + ".js";
			import(modulePath).then((module) => {
				eventEmitter.emit(module.default);
			});
			return eventEmitter;
		};
	}
	constructor() {
		super();
	}
}

export default AbstractModule;