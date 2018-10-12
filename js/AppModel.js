import AbstractModel from "./AbstractModel.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import AppUtils from "./AppUtils.js";

class AppModel extends AbstractModel {
	static get parameters() {
		return AppUtils.getParameters(AbstractClassHelper);
	}
	constructor(AbstractClassHelper) {
		super(AbstractClassHelper);
		this._cacheChangeSubscriber = null;
	}
	onInit() {
		this.getCache().getItem("searchLastType", "description").subscribe((value) => {
			this.data.searchLastType = value;
		});
		this._cacheChangeSubscriber = this.getCache().on("change").subscribe((event) => {
			if (event.key === "searchLastType") {
				this.data.searchLastType = event.newValue;
			}
		});
	}
	onDestroy() {
		this._cacheChangeSubscriber.unsubscribe();
	}
	_getInitData() {
		return {
			searchLastType: null
		};
	}
}

export default AppModel;