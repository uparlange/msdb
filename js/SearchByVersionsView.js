import AbstractView from "./AbstractView.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import SearchByVersionsModel from "./SearchByVersionsModel.js";

class SearchByVersionsView extends AbstractView {
	static get annotations() {
		return this.getAnnotations({ selector: "searchByVersions" });
	}
	static get parameters() {
		return this.getParameters(AbstractClassHelper, SearchByVersionsModel);
	}
	constructor(AbstractClassHelper, SearchByVersionsModel) {
		super(AbstractClassHelper, SearchByVersionsModel);
	}
}

export default SearchByVersionsView;