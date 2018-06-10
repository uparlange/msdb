import AbstractView from "./AbstractView.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import SearchBySeriesModel from "./SearchBySeriesModel.js";
import AppUtils from "./AppUtils.js";

class SearchBySeriesView extends AbstractView {
	static get annotations() {
		return this.getAnnotations({
			selector: "searchBySeries",
			queries: {
				paginator: new ng.core.ViewChild(ng.material.MatPaginator)
			}
		});
	}
	static get parameters() {
		return AppUtils.getParameters(AbstractClassHelper, SearchBySeriesModel);
	}
	constructor(AbstractClassHelper, SearchBySeriesModel) {
		super(AbstractClassHelper, SearchBySeriesModel);
	}
	onInit() {
		this.model.setPaginator(this.paginator);
	}
}

export default SearchBySeriesView;