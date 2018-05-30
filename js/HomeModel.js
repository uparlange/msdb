import AppUtils from "./AppUtils.js";
import AbstractModel from "./AbstractModel.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import MsdbService from "./MsdbService.js";

export default AppUtils.getClass({
	extends: AbstractModel,
	constructor: function HomeModel(AbstractClassHelper, MsdbService) {
		AbstractModel.call(this, AbstractClassHelper, MsdbService);
	},
	parameters: [
		[AbstractClassHelper], [MsdbService]
	],
	functions: {
		onInit: function () {
			this.data.searchLastType = this.getCache().getItem("searchLastType", "description");
		},
		onRefresh: function (callback) {
			if (this.data.mame.build === null) {
				this.getServices().getMameInfos().subscribe((data) => {
					if (data !== null) {
						data.version = data.build.substr(0, data.build.indexOf("(")).trim();
						this.data.mame = data;
					}
					callback();
				});
			}
		},
		_getInitData: function () {
			return {
				searchLastType: null,
				mame: {
					build: null
				}
			};
		}
	}
});