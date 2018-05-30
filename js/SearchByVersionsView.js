import AppUtils from "./AppUtils.js";
import AbstractView from "./AbstractView.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import SearchByVersionsModel from "./SearchByVersionsModel.js";

export default AppUtils.getClass({
	extends: AbstractView,
	constructor: function SearchByVersionsView(AbstractClassHelper, SearchByVersionsModel) {
		AbstractView.call(this, AbstractClassHelper, SearchByVersionsModel);
	},
	parameters: [
		[AbstractClassHelper], [SearchByVersionsModel]
	],
	annotations: [
		new ng.core.Component(AppUtils.getComponentConfiguration("searchByVersions"))
	]
});