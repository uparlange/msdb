import AppUtils from "./AppUtils.js";
import AbstractView from "./AbstractView.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import SearchModel from "./SearchModel.js";

export default AppUtils.getClass({
	extends: AbstractView,
	constructor: function SearchView(AbstractClassHelper, SearchModel) {
		AbstractView.call(this, AbstractClassHelper, SearchModel);
	},
	parameters: [
		[AbstractClassHelper], [SearchModel]
	],
	annotations: [
		new ng.core.Component(AppUtils.getComponentConfiguration("search"))
	],
	functions: {
		tabChanged: function (event) {
			this.model.tabChanged(event);
			const url = "/search/" + this.model.getTabsInfo().byIndex(event.index).type;
			this.getRouter().navigate([url]);
		}
	}
});