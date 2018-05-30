import AppUtils from "./AppUtils.js";
import AbstractModule from "./AbstractModule.js";
import CommonModule from "./CommonModule.js";
import SearchByYearsView from "./SearchByYearsView.js";
import SearchByYearsModel from "./SearchByYearsModel.js";

export default AppUtils.getClass({
	extends: AbstractModule,
	constructor: function SearchByYearsModule() {
		AbstractModule.call(this);
	},
	annotations: [
		new ng.core.NgModule({
			imports: [
				CommonModule,
				ng.router.RouterModule.forChild([
					{ path: "", component: SearchByYearsView }
				])
			],
			declarations: [
				SearchByYearsView
			],
			providers: [
				SearchByYearsModel
			]
		})
	]
});