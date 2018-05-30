import AppUtils from "./AppUtils.js";
import AbstractModule from "./AbstractModule.js";
import CommonModule from "./CommonModule.js";
import SearchByVersionsView from "./SearchByVersionsView.js";
import SearchByVersionsModel from "./SearchByVersionsModel.js";

export default AppUtils.getClass({
	extends: AbstractModule,
	constructor: function SearchByVersionsModule() {
		AbstractModule.call(this);
	},
	annotations: [
		new ng.core.NgModule({
			imports: [
				CommonModule,
				ng.router.RouterModule.forChild([
					{ path: "", component: SearchByVersionsView }
				])
			],
			declarations: [
				SearchByVersionsView
			],
			providers: [
				SearchByVersionsModel
			]
		})
	]
});