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
	onInit() {
		this._setFilterValue(this.getCache().getItem("searchByYearsFilterValue", ""));
	}
	onRefresh(callback) {
		this.getServices().getYears().subscribe((data) => {
			this.data.list.data = data;
			callback();
		});
	}
	onDestroy() {
		this.getCache().setItem("searchByYearsFilterValue", this.data.filterValue);
	}
	trackByLabel(index, item) {
		return item ? item.label : undefined;
	}
	applyFilter(value) {
		this._setFilterValue(value);
	}
	clearFilter() {
		this._setFilterValue("");
	}
	_setFilterValue(value) {
		this.data.filterValue = value;
		this.data.list.filter = value;
	}
	_getInitData() {
		return {
			list: new ng.material.MatTableDataSource(),
			filterValue: "",
			displayedColumns: ["label"]
		};
	}
}

export default SearchByYearsModel;