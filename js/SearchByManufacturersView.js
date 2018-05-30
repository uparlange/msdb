import AppUtils from "./AppUtils.js";
import AbstractView from "./AbstractView.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import SearchByManufacturersModel from "./SearchByManufacturersModel.js";

export default AppUtils.getClass({
	extends: AbstractView,
	constructor: function SearchByManufacturersView(AbstractClassHelper, SearchByManufacturersModel) {
		AbstractView.call(this, AbstractClassHelper, SearchByManufacturersModel);
	},
	parameters: [
		[AbstractClassHelper], [SearchByManufacturersModel]
	],
	annotations: [
		new ng.core.Component(AppUtils.getComponentConfiguration("searchByManufacturers"))
	]
});