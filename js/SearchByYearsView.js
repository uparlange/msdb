import AbstractView from "./AbstractView.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import SearchByYearsModel from "./SearchByYearsModel.js";

class SearchByYearsView extends AbstractView {
	static get annotations() {
		return this.getAnnotations({ selector: "searchByYears" });
	}
	static get parameters() {
		return this.getParameters(AbstractClassHelper, SearchByYearsModel);
	}
	constructor(AbstractClassHelper, SearchByYearsModel) {
		super(AbstractClassHelper, SearchByYearsModel);
	}
}

export default SearchByYearsView;