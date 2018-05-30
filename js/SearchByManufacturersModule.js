import AppUtils from "./AppUtils.js";
import AbstractModule from "./AbstractModule.js";
import CommonModule from "./CommonModule.js";
import SearchByManufacturersView from "./SearchByManufacturersView.js";
import SearchByManufacturersModel from "./SearchByManufacturersModel.js";

export default AppUtils.getClass({
	extends: AbstractModule,
	constructor: function SearchByManufacturersModule() {
		AbstractModule.call(this);
	},
	annotations: [
		new ng.core.NgModule({
			imports: [
				CommonModule,
				ng.router.RouterModule.forChild([
					{ path: "", component: SearchByManufacturersView }
				])
			],
			declarations: [
				SearchByManufacturersView
			],
			providers: [
				SearchByManufacturersModel
			]
		})
	]
});