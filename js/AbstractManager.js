import AppUtils from "./AppUtils.js";
import AbstractEventManager from "./AbstractEventManager.js";

export default AppUtils.getClass({
	extends: AbstractEventManager,
	constructor: function AbstractManager() {
		AbstractEventManager.call(this);
	},
	functions: {
		init: function () {

		}
	}
});