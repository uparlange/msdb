import AppUtils from "./AppUtils.js";
import AbstractModel from "./AbstractModel.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import MsdbService from "./MsdbService.js";

export default AppUtils.getClass({
	extends: AbstractModel,
	constructor: function SearchByDescriptionModel(AbstractClassHelper, MsdbService) {
		AbstractModel.call(this, AbstractClassHelper, MsdbService);
	},
	parameters: [
		[AbstractClassHelper], [MsdbService]
	],
	functions: {
		onInit: function () {
			this.data.description = this.getCache().getItem("searchDescription", "");
		},
		onDestroy: function () {
			this.getCache().setItem("searchDescription", this.data.description);
		},
		_getInitData: function () {
			return {
				description: ""
			};
		}
	}
});