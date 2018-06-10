import AbstractModel from "./AbstractModel.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import MsdbService from "./MsdbService.js";
import AppUtils from "./AppUtils.js";

class SearchByDescriptionModel extends AbstractModel {
	static get parameters() {
		return AppUtils.getParameters(AbstractClassHelper, MsdbService);
	}
	constructor(AbstractClassHelper, MsdbService) {
		super(AbstractClassHelper, MsdbService);
	}
	onInit() {
		this.data.description = this.getCache().getItem("searchDescription", "");
	}
	onDestroy() {
		this.getCache().setItem("searchDescription", this.data.description);
	}
	_getInitData() {
		return {
			description: ""
		};
	}
}

export default SearchByDescriptionModel;