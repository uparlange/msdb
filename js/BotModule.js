import AppUtils from "./AppUtils.js";
import AbstractModule from "./AbstractModule.js";
import CommonModule from "./CommonModule.js";
import BotView from "./BotView.js";
import BotModel from "./BotModel.js";

export default AppUtils.getClass({
	extends: AbstractModule,
	constructor: function BotModule() {
		AbstractModule.call(this);
	},
	annotations: [
		new ng.core.NgModule({
			imports: [
				CommonModule,
				ng.router.RouterModule.forChild([
					{ path: "", component: BotView }
				])
			],
			declarations: [
				BotView
			],
			providers: [
				BotModel
			]
		})
	]
});