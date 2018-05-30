import AppUtils from "./AppUtils.js";
import AbstractModule from "./AbstractModule.js";
import CommonModule from "./CommonModule.js";
import HomeView from "./HomeView.js";
import HomeModel from "./HomeModel.js";

export default AppUtils.getClass({
	extends: AbstractModule,
	constructor: function HomeModule() {
		AbstractModule.call(this);
	},
	annotations: [
		new ng.core.NgModule({
			imports: [
				CommonModule,
				ng.router.RouterModule.forChild([
					{ path: "", component: HomeView }
				])
			],
			declarations: [
				HomeView
			],
			providers: [
				HomeModel
			]
		})
	]
});