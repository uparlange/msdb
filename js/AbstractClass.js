import AppUtils from "./AppUtils.js";
import LogUtils from "./LogUtils.js";

export default AppUtils.getClass({
	constructor: function AbstractClass() {
		this._logger = LogUtils.getLogger(this.constructor.name);
		this.getLogger().debug("constructor");
	},
	functions: {
		getLogger: function () {
			return this._logger;
		}
	}
});