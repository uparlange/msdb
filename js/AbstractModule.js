import AppUtils from "./AppUtils.js";
import AbstractClass from "./AbstractClass.js";

export default AppUtils.getClass({
	extends: AbstractClass,
	constructor: function AbstractModule() {
		AbstractClass.call(this);
	}
});