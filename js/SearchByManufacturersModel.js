import AbstractModel from "./AbstractModel.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import MsdbService from "./MsdbService.js";
import AppUtils from "./AppUtils.js";

class SearchByManufacturersModel extends AbstractModel {
	static get parameters() {
		return AppUtils.getParameters(AbstractClassHelper, MsdbService);
	}
	constructor(AbstractClassHelper, MsdbService) {
		super(AbstractClassHelper, MsdbService);
	}
	onInit() {
		this._setFilterValue(this.getCache().getItem("searchByManufacturerFilterValue", ""));
	}
	onRefresh(callback) {
		this.getServices().getManufacturers().subscribe((data) => {
			this.data.list.data = data;
			callback();
		});
	}
	onDestroy() {
		this.getCache().setItem("searchByManufacturerFilterValue", this.data.filterValue);
		this.data.list.paginator = null;
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
	setPaginator(paginator) {
		this.data.list.paginator = paginator;
	}
	pageChanged(event) {
		this.data.pageIndex = event.pageIndex;
	}
	_setFilterValue(value) {
		this.data.filterValue = value;
		this.data.list.filter = value;
	}
	_getInitData() {
		return {
			list: new ng.material.MatTableDataSource(),
			filterValue: "",
			displayedColumns: ["label"],
			pageIndex: 0
		};
	}
}

export default SearchByManufacturersModel;