import AppUtils from "./AppUtils.js";
import AbstractView from "./AbstractView.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import SearchByYearsModel from "./SearchByYearsModel.js";

export default AppUtils.getClass({
	extends: AbstractView,
	constructor: function SearchByYearsView(AbstractClassHelper, SearchByYearsModel) {
		AbstractView.call(this, AbstractClassHelper, SearchByYearsModel);
	},
	parameters: [
		[AbstractClassHelper], [SearchByYearsModel]
	],
	annotations: [
		new ng.core.Component(AppUtils.getComponentConfiguration("searchByYears"))
	]
});