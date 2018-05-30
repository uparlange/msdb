import AppUtils from "./AppUtils.js";
import AbstractView from "./AbstractView.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import SearchByRatingsModel from "./SearchByRatingsModel.js";

export default AppUtils.getClass({
	extends: AbstractView,
	constructor: function SearchByYearsView(AbstractClassHelper, SearchByRatingsModel) {
		AbstractView.call(this, AbstractClassHelper, SearchByRatingsModel);
	},
	parameters: [
		[AbstractClassHelper], [SearchByRatingsModel]
	],
	annotations: [
		new ng.core.Component(AppUtils.getComponentConfiguration("searchByRatings"))
	]
});