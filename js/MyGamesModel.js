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
		this._needRefresh = false;
		this._changeInRomsDirectorySubscriber = null;
		this._configChangedSubscriber = this.getEventBus().on("CONFIG_CHANGED").subscribe(() => {
			this._needRefresh = true;
		});
	}
	onInit() {
		this.getCache().getItem("myGamesFilterValue", "").subscribe((value) => {
			this._setFilterValue(value);
		});
		if (this._needRefresh) {
			this._refreshList();
		}
		this._changeInRomsDirectorySubscriber = this.getSocket().on("CHANGE_IN_ROMS_DIRECTORY").subscribe(() => {
			this._refreshList();
		});
	}
	onRefresh(callback) {
		this._refreshList(callback);
	}
	onDestroy() {
		this.getCache().setItem("myGamesFilterValue", this.data.filterValue, "version");
		this._changeInRomsDirectorySubscriber.unsubscribe();
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
					this.data.list.data = data || [];
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