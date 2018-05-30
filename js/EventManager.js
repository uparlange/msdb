import AppUtils from "./AppUtils.js";
import AbstractManager from "./AbstractManager.js";

export default AppUtils.getClass({
	extends: AbstractManager,
	constructor: function EventManager() {
		AbstractManager.call(this);
	}
});