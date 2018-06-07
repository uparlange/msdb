import AbstractView from "./AbstractView.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import SearchModel from "./SearchModel.js";

class SearchView extends AbstractView {
	static get annotations() {
		return this.getAnnotations({ selector: "search" });
	}
	static get parameters() {
		return this.getParameters(AbstractClassHelper, SearchModel);
	}
	constructor(AbstractClassHelper, SearchModel) {
		super(AbstractClassHelper, SearchModel);
	}
	tabChanged(event) {
		this.model.tabChanged(event);
		const url = "/search/" + this.model.getTabsInfo().byIndex(event.index).type;
		this.getRouter().navigate([url]);
	}
}

export default SearchView;