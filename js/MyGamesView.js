import AppUtils from "./AppUtils.js";
import AbstractView from "./AbstractView.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import MyGamesModel from "./MyGamesModel.js";

export default AppUtils.getClass({
	extends: AbstractView,
	constructor: function MyGamesView(AbstractClassHelper, MyGamesModel) {
		AbstractView.call(this, AbstractClassHelper, MyGamesModel);
	},
	parameters: [
		[AbstractClassHelper], [MyGamesModel]
	],
	annotations: [
		new ng.core.Component(AppUtils.getComponentConfiguration("myGames"))
	]
});