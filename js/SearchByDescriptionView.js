import AbstractView from "./AbstractView.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import SearchByDescriptionModel from "./SearchByDescriptionModel.js";
import AppUtils from "./AppUtils.js";

class SearchByDescriptionView extends AbstractView {
	static get annotations() {
		return this.getAnnotations({ selector: "searchByDescription" });
	}
	static get parameters() {
		return AppUtils.getParameters(AbstractClassHelper, SearchByDescriptionModel);
	}
	constructor(AbstractClassHelper, SearchByDescriptionModel) {
		super(AbstractClassHelper, SearchByDescriptionModel);
	}
}

export default SearchByDescriptionView;