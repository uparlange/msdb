import AbstractModel from "./AbstractModel.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import MsdbService from "./MsdbService.js";
import AppUtils from "./AppUtils.js";

class MyGamesModel extends AbstractModel {
	static get parameters() {
		return AppUtils.getParameters(AbstractClassHelper, MsdbService);
	}
	constructor(AbstractClassHelper, MsdbService) {
		super(AbstractClassHelper, MsdbService);
		this._socketConfigChangedSubscriber = null;
	}
	onInit() {
		this._setFilterValue(this.getCache().getItem("myGamesFilterValue", ""));
		this._socketConfigChangedSubscriber = this.getSocket().on("CONFIG_CHANGED").subscribe(() => {
			this._refreshList();
		});
	}
	onRefresh(callback) {
		this._refreshList(callback);
	}
	onDestroy() {
		this.getCache().setItem("myGamesFilterValue", this.data.filterValue);
		this.data.list.paginator = null;
		this._socketConfigChangedSubscriber.unsubscribe();
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
		this.getSocket().emit("GET_MY_GAMES", null).subscribe((result) => {
			if (Array.isArray(result)) {
				this.getServices().search("name", result).subscribe((data) => {
					if (Array.isArray(data)) {
						data.sort((x, y) => {
							if (x.isbios < y.isbios) return -1;
							if (x.isbios > y.isbios) return 1;
							return 0;
						});
					}
					this.data.list.data = data;
					if (callback) {
						callback();
					}
				});
			} else {
				if (callback) {
					callback();
				}
			}
		});
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

export default MyGamesModel;