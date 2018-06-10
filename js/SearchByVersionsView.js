import AbstractView from "./AbstractView.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import SearchByVersionsModel from "./SearchByVersionsModel.js";
import AppUtils from "./AppUtils.js";

class SearchByVersionsView extends AbstractView {
	static get annotations() {
		return this.getAnnotations({
			selector: "searchByVersions",
			queries: {
				paginator: new ng.core.ViewChild(ng.material.MatPaginator)
			}
		});
	}
	static get parameters() {
		return AppUtils.getParameters(AbstractClassHelper, SearchByVersionsModel);
	}
	constructor(AbstractClassHelper, SearchByVersionsModel) {
		super(AbstractClassHelper, SearchByVersionsModel);
	}
	onInit() {
		this.model.setPaginator(this.paginator);
	}
}

export default SearchByVersionsView;