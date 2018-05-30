import AppUtils from "./AppUtils.js";
import AbstractModule from "./AbstractModule.js";
import CommonModule from "./CommonModule.js";
import SearchByDescriptionView from "./SearchByDescriptionView.js";
import SearchByDescriptionModel from "./SearchByDescriptionModel.js";

export default AppUtils.getClass({
	extends: AbstractModule,
	constructor: function SearchByDescriptionModule() {
		AbstractModule.call(this);
	},
	annotations: [
		new ng.core.NgModule({
			imports: [
				CommonModule,
				ng.router.RouterModule.forChild([
					{ path: "", component: SearchByDescriptionView }
				])
			],
			declarations: [
				SearchByDescriptionView
			],
			providers: [
				SearchByDescriptionModel
			]
		})
	]
});