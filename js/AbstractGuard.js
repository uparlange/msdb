import AppUtils from "./AppUtils.js";
import AbstractClass from "./AbstractClass.js";

export default AppUtils.getClass({
	extends: AbstractClass,
	constructor: function AbstractGuard(AbstractClassHelper) {
		AbstractClass.call(this);
		this._helper = AbstractClassHelper;
	},
	functions: {
		getLabels: function () {
			return this._helper.getLabels();
		},
		getWindowRef: function () {
			return this._helper.getWindowRef();
		}
	}
});