import AbstractView from "./AbstractView.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import SearchBySeriesModel from "./SearchBySeriesModel.js";

class SearchBySeriesView extends AbstractView {
	static get annotations() {
		return this.getAnnotations({ selector: "searchBySeries" });
	}
	static get parameters() {
		return this.getParameters(AbstractClassHelper, SearchBySeriesModel);
	}
	constructor(AbstractClassHelper, SearchBySeriesModel) {
		super(AbstractClassHelper, SearchBySeriesModel);
	}
}

export default SearchBySeriesView;