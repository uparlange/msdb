import AbstractView from "./AbstractView.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import SearchByYearsModel from "./SearchByYearsModel.js";
import AppUtils from "./AppUtils.js";

class SearchByYearsView extends AbstractView {
	static get annotations() {
		return this.getAnnotations({ selector: "searchByYears" });
	}
	static get parameters() {
		return AppUtils.getParameters(AbstractClassHelper, SearchByYearsModel);
	}
	constructor(AbstractClassHelper, SearchByYearsModel) {
		super(AbstractClassHelper, SearchByYearsModel);
	}
}

export default SearchByYearsView;