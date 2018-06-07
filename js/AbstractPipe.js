import AbstractClass from "./AbstractClass.js";

class AbstractPipe extends AbstractClass {
	static getAnnotations(params) {
		return [
			new ng.core.Pipe(params)
		];
	}
	constructor(AbstractClassHelper) {
		super();
		this._helper = AbstractClassHelper;
	}
	ngOnDestroy() {
		if (typeof this.onDestroy === "function") {
			this.getLogger().debug("onDestroy");
			this.onDestroy();
		}
		else {
			this.getLogger().warn("onDestroy?");
		}
		this._helper = null;
	}
	getLabels() {
		return this._helper.getLabels();
	}
}

export default AbstractPipe;