import AppUtils from "./AppUtils.js"
import AbstractView from "./AbstractView.js"
import AbstractClassHelper from "./AbstractClassHelper.js"
import HomeModel from "./HomeModel.js"

export default AppUtils.getClass({
	extends: AbstractView,
	constructor: function HomeView(AbstractClassHelper, HomeModel) {
		AbstractView.call(this, AbstractClassHelper, HomeModel);
	},
	parameters: [
		[AbstractClassHelper], [HomeModel]
	],
	annotations: [
		new ng.core.Component(AppUtils.getComponentConfiguration("home"))
	]
});