import AbstractModel from "./AbstractModel.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import MsdbService from "./MsdbService.js";
import AppUtils from "./AppUtils.js";

class SearchByVersionsModel extends AbstractModel {
	static get parameters() {
		return AppUtils.getParameters(AbstractClassHelper, MsdbService);
	}
	constructor(AbstractClassHelper, MsdbService) {
		super(AbstractClassHelper, MsdbService);
	}
	onInit() {
		this.getCache().getItem("searchByVersionsFilterValue", "").subscribe((value) => {
			this._setFilterValue(value);
		});
	}
	onRefresh(callback) {
		this.getServices().getVersions().subscribe((data) => {
			this.data.list.data = data;
			callback();
		});
	}
	onDestroy() {
		this.getCache().setItem("searchByVersionsFilterValue", this.data.filterValue, "version");
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
	getVersion(value) {
		let version = value;
		version = version.replace("0.00", "0");
		version = version.replace("0.0", "0");
		version = version.replace("0.", "0");
		return version.toLowerCase();
	}
	changeLogAvailable(value) {
		return (value.indexOf("u") === -1);
	}
	_setFilterValue(value) {
		this.data.filterValue = value;
		this.data.list.filter = value;
	}
	_getInitData() {
		return {
			list: new ng.material.MatTableDataSource(),
			filterValue: "",
			displayedColumns: ["label", "addcount", "changelog"],
			pageIndex: 0
		};
	}
}

export default SearchByVersionsModel;