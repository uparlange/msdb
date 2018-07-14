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
	}
	onInit() {
		switch (this.params.value) {
			case this.SYSTEM_DEVICE:
				this.data.showBios = false;
				this.data.showDevice = true;
				this.data.showClone = false;
				break;
			case this.SYSTEM_BIOS:
				this.data.showBios = true;
				this.data.showDevice = false;
				this.data.showClone = false;
				break;
			default:
				this.data.showBios = false;
				this.data.showDevice = false;
				this.data.showClone = true;
				break;
		}
		this._getTitle().subscribe((title) => {
			this.data.title = title;
			this.getHistory().add({ label: title, url: this.getRouter().getUrl(), icon: "magnify" });
		})
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
	_getTitle() {
		const eventEmitter = new ng.core.EventEmitter();
		const labelKey = this._getSearchLabel(this.params.type);
		this.getLabels().getValues([labelKey]).subscribe((translations) => {
			const title = `${translations[labelKey]} "${this.params.value}"`;
			eventEmitter.emit(title);
		});
		return eventEmitter;
	}
	_getSearchLabel(type) {
		return (type) ? `L10N_SEARCH_BY_${type.toUpperCase()}` : "";
	}
	_filterList() {
		this.data.list.data = this.data.source.filter((game) => {
			return (
				(game.category !== this.SYSTEM_DEVICE && game.category !== this.SYSTEM_BIOS && game.cloneof == null) ||
				(game.cloneof != null && this.data.showClone) ||
				(game.category === this.SYSTEM_DEVICE && this.data.showDevice) ||
				(game.category === this.SYSTEM_BIOS && this.data.showBios)
			)
		});
	}
	_getInitData() {
		return {
			source: null,
			list: new ng.material.MatTableDataSource(),
			displayedColumns: ["icon", "description"],
			pageIndex: 0,
			showBios: false,
			showDevice: false,
			showClone: false,
			title: ""
		};
	}
}

export default ResultModel;