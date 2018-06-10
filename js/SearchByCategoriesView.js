import AbstractView from "./AbstractView.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import SearchByCategoriesModel from "./SearchByCategoriesModel.js";
import AppUtils from "./AppUtils.js";

class SearchByCategoriesView extends AbstractView {
	static get annotations() {
		return this.getAnnotations({ selector: "searchByCategories" });
	}
	static get parameters() {
		return AppUtils.getParameters(AbstractClassHelper, SearchByCategoriesModel);
	}
	constructor(AbstractClassHelper, SearchByCategoriesModel) {
		super(AbstractClassHelper, SearchByCategoriesModel);
	}
	showSubCategory(item) {
		this.getRouter().navigate([], { queryParams: { category: item.label } });
	}
	showCategoryItems(item) {
		this.getRouter().navigate(["/result"], { queryParams: { type: "category", value: item.data } });
	}
}

export default SearchByCategoriesView;