import AppUtils from "./AppUtils.js";
import AbstractModule from "./AbstractModule.js";
import CommonModule from "./CommonModule.js";
import SearchBySeriesView from "./SearchBySeriesView.js";
import SearchBySeriesModel from "./SearchBySeriesModel.js";

export default AppUtils.getClass({
	extends: AbstractModule,
	constructor: function SearchBySeriesModule() {
		AbstractModule.call(this);
	},
	annotations: [
		new ng.core.NgModule({
			imports: [
				CommonModule,
				ng.router.RouterModule.forChild([
					{ path: "", component: SearchBySeriesView }
				])
			],
			declarations: [
				SearchBySeriesView
			],
			providers: [
				SearchBySeriesModel
			]
		})
	]
});