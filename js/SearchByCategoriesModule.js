import AppUtils from "./AppUtils.js";
import AbstractModule from "./AbstractModule.js";
import CommonModule from "./CommonModule.js";
import SearchByCategoriesView from "./SearchByCategoriesView.js";
import SearchByCategoriesModel from "./SearchByCategoriesModel.js";

export default AppUtils.getClass({
	extends: AbstractModule,
	constructor: function SearchByCategoriesModule() {
		AbstractModule.call(this);
	},
	annotations: [
		new ng.core.NgModule({
			imports: [
				CommonModule,
				ng.router.RouterModule.forChild([
					{ path: "", component: SearchByCategoriesView }
				])
			],
			declarations: [
				SearchByCategoriesView
			],
			providers: [
				SearchByCategoriesModel
			]
		})
	]
});