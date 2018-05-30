import AppUtils from "./AppUtils.js";
import AbstractView from "./AbstractView.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import SearchByCategoriesModel from "./SearchByCategoriesModel.js";

export default AppUtils.getClass({
	extends: AbstractView,
	constructor: function SearchByCategoriesView(AbstractClassHelper, SearchByCategoriesModel) {
		AbstractView.call(this, AbstractClassHelper, SearchByCategoriesModel);
	},
	parameters: [
		[AbstractClassHelper], [SearchByCategoriesModel]
	],
	annotations: [
		new ng.core.Component(AppUtils.getComponentConfiguration("searchByCategories"))
	],
	functions: {
		showSubCategory: function (item) {
			this.getRouter().navigate([], { queryParams: { category: item.label } });
		},
		showCategoryItems: function (item) {
			this.getRouter().navigate(["/result"], { queryParams: { type: "category", value: item.data } });
		}
	}
});