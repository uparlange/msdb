import AbstractView from "./AbstractView.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import SearchByDescriptionModel from "./SearchByDescriptionModel.js";

class SearchByDescriptionView extends AbstractView {
	static get annotations() {
		return this.getAnnotations({ selector: "searchByDescription" });
	}
	static get parameters() {
		return this.getParameters(AbstractClassHelper, SearchByDescriptionModel);
	}
	constructor(AbstractClassHelper, SearchByDescriptionModel) {
		super(AbstractClassHelper, SearchByDescriptionModel);
	}
}

export default SearchByDescriptionView;