import AbstractClass from "./AbstractClass.js";

class AbstractGuard extends AbstractClass {
	constructor(AbstractClassHelper) {
		super();
		this._helper = AbstractClassHelper;
	}
	getLabels() {
		return this._helper.getLabels();
	}
	getWindowRef() {
		return this._helper.getWindowRef();
	}
}

export default AbstractGuard;