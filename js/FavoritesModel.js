import AbstractModel from "./AbstractModel.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import MsdbService from "./MsdbService.js";
import AppUtils from "./AppUtils.js";

class FavoritesModel extends AbstractModel {
	static get parameters() {
		return AppUtils.getParameters(AbstractClassHelper, MsdbService);
	}
	constructor(AbstractClassHelper, MsdbService) {
		super(AbstractClassHelper, MsdbService);
		this._needRefresh = false;
		this._changeSubscriber = this.getFavorites().on("change").subscribe(() => {
			this._needRefresh = true;
		});
	}
	onInit() {
		this._setFilterValue(this.getCache().getItem("version", "favoritesFilterValue", ""));
		if (this._needRefresh) {
			this._refreshList();
		}
	}
	onRefresh(callback) {
		this._refreshList(callback);
	}
	onDestroy() {
		this.getCache().setItem("version", "favoritesFilterValue", this.data.filterValue);
		this.data.list.paginator = null;
	}
	trackByName(index, item) {
		return item ? item.name : undefined;
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
	_refreshList(callback) {
		this._needRefresh = false;
		this.data.list.data = [];
		this.getFavorites().getList().subscribe((list) => {
			this.getServices().search("name", list).subscribe((data) => {
				this.data.list.data = data || [];
				if (callback) {
					callback();
				}
			});
		})
	}
	_getInitData() {
		return {
			list: new ng.material.MatTableDataSource(),
			filterValue: "",
			displayedColumns: ["icon", "description"],
			pageIndex: 0
		};
	}
}

export default FavoritesModel;