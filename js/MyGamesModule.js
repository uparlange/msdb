import AppUtils from "./AppUtils.js";
import AbstractModule from "./AbstractModule.js";
import CommonModule from "./CommonModule.js";
import MyGamesView from "./MyGamesView.js";
import MyGamesModel from "./MyGamesModel.js";
import MyGamesCanActivate from "./MyGamesCanActivate.js";

export default AppUtils.getClass({
	extends: AbstractModule,
	constructor: function MyGamesModule() {
		AbstractModule.call(this);
	},
	annotations: [
		new ng.core.NgModule({
			imports: [
				CommonModule,
				ng.router.RouterModule.forChild([
					{ path: "", component: MyGamesView, canActivate: [MyGamesCanActivate] }
				])
			],
			declarations: [
				MyGamesView
			],
			providers: [
				MyGamesModel,
				MyGamesCanActivate
			]
		})
	]
});