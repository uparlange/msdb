import AppUtils from "./AppUtils.js";
import AbstractModule from "./AbstractModule.js";
import CommonModule from "./CommonModule.js";
import SearchByRatingsView from "./SearchByRatingsView.js";
import SearchByRatingsModel from "./SearchByRatingsModel.js";

export default AppUtils.getClass({
	extends: AbstractModule,
	constructor: function SearchByRatingsModule() {
		AbstractModule.call(this);
	},
	annotations: [
		new ng.core.NgModule({
			imports: [
				CommonModule,
				ng.router.RouterModule.forChild([
					{ path: "", component: SearchByRatingsView }
				])
			],
			declarations: [
				SearchByRatingsView
			],
			providers: [
				SearchByRatingsModel
			]
		})
	]
});