import AbstractView from "./AbstractView.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import SearchByManufacturersModel from "./SearchByManufacturersModel.js";
import AppUtils from "./AppUtils.js";

class SearchByManufacturersView extends AbstractView {
	static get annotations() {
		return this.getAnnotations({
			selector: "searchByManufacturers",
			queries: {
				paginator: new ng.core.ViewChild(ng.material.MatPaginator)
			}
		});
	}
	static get parameters() {
		return AppUtils.getParameters(AbstractClassHelper, SearchByManufacturersModel);
	}
	constructor(AbstractClassHelper, SearchByManufacturersModel) {
		super(AbstractClassHelper, SearchByManufacturersModel);
	}
	onInit() {
		this.model.setPaginator(this.paginator);
	}
}

export default SearchByManufacturersView;