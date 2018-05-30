import AppUtils from "./AppUtils.js";
import AbstractView from "./AbstractView.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import ResultModel from "./ResultModel.js";

export default AppUtils.getClass({
	extends: AbstractView,
	constructor: function ResultView(AbstractClassHelper, ResultModel) {
		AbstractView.call(this, AbstractClassHelper, ResultModel);
	},
	parameters: [
		[AbstractClassHelper], [ResultModel]
	],
	annotations: [
		new ng.core.Component(AppUtils.getComponentConfiguration("result"))
	]
});