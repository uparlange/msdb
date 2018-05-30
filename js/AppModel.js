import AppUtils from "./AppUtils.js";
import AbstractModel from "./AbstractModel.js";
import AbstractClassHelper from "./AbstractClassHelper.js";

export default AppUtils.getClass({
	extends: AbstractModel,
	constructor: function AppModel(AbstractClassHelper) {
		AbstractModel.call(this, AbstractClassHelper);
		this._cacheChangeSubscriber = null;
	},
	parameters: [
		[AbstractClassHelper]
	],
	functions: {
		onInit: function () {
			this.data.searchLastType = this.getCache().getItem("searchLastType", "description");
			this._cacheChangeSubscriber = this.getCache().on("change").subscribe((event) => {
				if (event.key === "searchLastType") {
					this.data.searchLastType = event.newValue;
				}
			});
		},
		onDestroy: function () {
			this._cacheChangeSubscriber.unsubscribe();
		},
		_getInitData: function () {
			return {
				searchLastType: null
			};
		}
	}
});