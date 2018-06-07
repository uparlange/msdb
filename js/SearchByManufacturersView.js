import AbstractView from "./AbstractView.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import SearchByManufacturersModel from "./SearchByManufacturersModel.js";

class SearchByManufacturersView extends AbstractView {
	static get annotations() {
		return this.getAnnotations({ selector: "searchByManufacturers" });
	}
	static get parameters() {
		return this.getParameters(AbstractClassHelper, SearchByManufacturersModel);
	}
	constructor(AbstractClassHelper, SearchByManufacturersModel) {
		super(AbstractClassHelper, SearchByManufacturersModel);
	}
}

export default SearchByManufacturersView;