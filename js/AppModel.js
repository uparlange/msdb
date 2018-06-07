import AbstractModel from "./AbstractModel.js";
import AbstractClassHelper from "./AbstractClassHelper.js";

class AppModel extends AbstractModel {
	static get parameters() {
		return this.getParameters(AbstractClassHelper);
	}
	constructor(AbstractClassHelper) {
		super(AbstractClassHelper);
		this._cacheChangeSubscriber = null;
	}
	onInit() {
		this.data.searchLastType = this.getCache().getItem("searchLastType", "description");
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