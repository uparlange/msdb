import AbstractView from "./AbstractView.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import SearchByRatingsModel from "./SearchByRatingsModel.js";
import AppUtils from "./AppUtils.js";

class SearchByYearsView extends AbstractView {
	static get annotations() {
		return this.getAnnotations({ selector: "searchByRatings" });
	}
	static get parameters() {
		return AppUtils.getParameters(AbstractClassHelper, SearchByRatingsModel);
	}
	constructor(AbstractClassHelper, SearchByRatingsModel) {
		super(AbstractClassHelper, SearchByRatingsModel);
	}
}

export default SearchByYearsView;