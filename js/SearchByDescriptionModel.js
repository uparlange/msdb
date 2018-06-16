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
		this.data.value = this.getCache().getItem("searchByDescriptionValue", "");
	}
	onDestroy() {
		this.getCache().setItem("searchByDescriptionValue", this.data.value);
	}
	_getInitData() {
		return {
			value: ""
		};
	}
}

export default SearchByDescriptionModel;