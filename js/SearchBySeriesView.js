import AppUtils from "./AppUtils.js";
import AbstractView from "./AbstractView.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import SearchBySeriesModel from "./SearchBySeriesModel.js";

export default AppUtils.getClass({
	extends: AbstractView,
	constructor: function SearchBySeriesView(AbstractClassHelper, SearchBySeriesModel) {
		AbstractView.call(this, AbstractClassHelper, SearchBySeriesModel);
	},
	parameters: [
		[AbstractClassHelper], [SearchBySeriesModel]
	],
	annotations: [
		new ng.core.Component(AppUtils.getComponentConfiguration("searchBySeries"))
	]
});