import AbstractModel from "./AbstractModel.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import MsdbService from "./MsdbService.js";
import AppUtils from "./AppUtils.js";

class ResultModel extends AbstractModel {
	static get parameters() {
		return AppUtils.getParameters(AbstractClassHelper, MsdbService);
	}
	constructor(AbstractClassHelper, MsdbService) {
		super(AbstractClassHelper, MsdbService);
		this.SYSTEM_DEVICE = "System / Device";
		this.SYSTEM_BIOS = "System / BIOS";
		this.showBios = false;
		this.showDevice = false;
		this.showClone = false;
	}
	onInit() {
		switch (this.params.value) {
			case this.SYSTEM_DEVICE:
				this.showBios = false;
				this.showDevice = true;
				this.showClone = false;
				break;
			case this.SYSTEM_BIOS:
				this.showBios = true;
				this.showDevice = false;
				this.showClone = false;
				break;
			default:
				this.showBios = false;
				this.showDevice = false;
				this.showClone = true;
				break;
		}
	}
	onRefresh(callback) {
		this.data.list.data = [];
		this.getServices().search(this.params.type, this.params.value).subscribe((data) => {
			this.data.source = data || [];
			this._filterList();
			callback();
		});
	}
	onDestroy() {
		this.data.list.paginator = null;
	}
	getSearchLabel(type) {
		return (type) ? `L10N_SEARCH_BY_${type.toUpperCase()}` : "";
	}
	trackByName(index, item) {
		return item ? item.name : undefined;
	}
	setPaginator(paginator) {
		this.data.list.paginator = paginator;
	}
	pageChanged(event) {
		this.data.pageIndex = event.pageIndex;
	}
	checkBoxChanged() {
		this._filterList();
	}
	_filterList() {
		this.data.list.data = this.data.source.filter((game) => {
			return (
				(game.category !== this.SYSTEM_DEVICE && game.category !== this.SYSTEM_BIOS && game.cloneof == null) ||
				(game.cloneof != null && this.showClone) ||
				(game.category === this.SYSTEM_DEVICE && this.showDevice) ||
				(game.category === this.SYSTEM_BIOS && this.showBios)
			)
		});
	}
	_getInitData() {
		return {
			source: null,
			list: new ng.material.MatTableDataSource(),
			displayedColumns: ["icon", "description"],
			pageIndex: 0
		};
	}
}

export default ResultModel;