import AppUtils from "./AppUtils.js";
import AbstractView from "./AbstractView.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import SearchByDescriptionModel from "./SearchByDescriptionModel.js";

export default AppUtils.getClass({
	extends: AbstractView,
	constructor: function SearchByDescriptionView(AbstractClassHelper, SearchByDescriptionModel) {
		AbstractView.call(this, AbstractClassHelper, SearchByDescriptionModel);
	},
	parameters: [
		[AbstractClassHelper], [SearchByDescriptionModel]
	],
	annotations: [
		new ng.core.Component(AppUtils.getComponentConfiguration("searchByDescription"))
	]
});