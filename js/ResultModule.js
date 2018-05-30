import AppUtils from "./AppUtils.js";
import AbstractModule from "./AbstractModule.js";
import CommonModule from "./CommonModule.js";
import ResultView from "./ResultView.js";
import ResultModel from "./ResultModel.js";

export default AppUtils.getClass({
	extends: AbstractModule,
	constructor: function ResultModule() {
		AbstractModule.call(this);
	},
	annotations: [
		new ng.core.NgModule({
			imports: [
				CommonModule,
				ng.router.RouterModule.forChild([
					{ path: "", component: ResultView }
				])
			],
			declarations: [
				ResultView
			],
			providers: [
				ResultModel
			]
		})
	]
});