import AbstractView from "./AbstractView.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import SearchByLanguagesModel from "./SearchByLanguagesModel.js";
import AppUtils from "./AppUtils.js";

class SearchByLanguagesView extends AbstractView {
	static get annotations() {
		return this.getAnnotations({ selector: "searchByLanguages" });
	}
	static get parameters() {
		return AppUtils.getParameters(AbstractClassHelper, SearchByLanguagesModel);
	}
	constructor(AbstractClassHelper, SearchByLanguagesModel) {
		super(AbstractClassHelper, SearchByLanguagesModel);
	}
}

export default SearchByLanguagesView;