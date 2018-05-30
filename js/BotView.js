import AppUtils from "./AppUtils.js";
import AbstractView from "./AbstractView.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import BotModel from "./BotModel.js";

export default AppUtils.getClass({
	extends: AbstractView,
	constructor: function BotView(AbstractClassHelper, BotModel) {
		AbstractView.call(this, AbstractClassHelper, BotModel);
	},
	parameters: [
		[AbstractClassHelper], [BotModel]
	],
	annotations: [
		new ng.core.Component(AppUtils.getComponentConfiguration("bot"))
	]
});