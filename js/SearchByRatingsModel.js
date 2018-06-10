import AbstractModel from "./AbstractModel.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import MsdbService from "./MsdbService.js";
import AppUtils from "./AppUtils.js";

class SearchByYearsModel extends AbstractModel {
	static get parameters() {
		return AppUtils.getParameters(AbstractClassHelper, MsdbService);
	}
	constructor(AbstractClassHelper, MsdbService) {
		super(AbstractClassHelper, MsdbService);
	}
	onRefresh(callback) {
		this.getServices().getRatings().subscribe((data) => {
			this.data.list.data = data;
			callback();
		});
	}
	trackByLabel(index, item) {
		return item ? item.label : undefined;
	}
	_getInitData() {
		return {
			list: new ng.material.MatTableDataSource(),
			displayedColumns: ["label"]
		};
	}
}

export default SearchByYearsModel;