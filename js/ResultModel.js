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
		this.FILTER_MESS = "mess";
		this.FILTER_CLONE = "clone";
		this.FILTER_BIOS = "bios";
		this.FILTER_DEVICE = "device";
	}
	onInit() {
		this._getTitle().subscribe((title) => {
			this.data.title = title;
			this.getHistory().add({ label: title, url: this.getRouter().getUrl(), icon: "magnify" });
		})
	}
	onRefresh(callback) {
		this.data.list.data = [];
		this._setFilterText("");
		this._setFilterList([]);
		this.getServices().search(this.params.type, this.params.value).subscribe((data) => {
			this.data.source = data || [];
			this._initFilters();
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
	applyFilter(value) {
		this._setFilterText(value);
	}
	clearFilter() {
		this._setFilterText("");
	}
	filterChange() {
		setTimeout(() => {
			this._filterList();
		}, 0);
	}
	_setFilterText(value) {
		this.data.filter.text = value;
		this.data.list.filter = value;
	}
	_setFilterList(value) {
		this.data.filter.list = value;
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
	_initFilters() {
		this.data.filter.messDisabled = this.data.source.findIndex(game => game.ismess) === -1;
		this.data.filter.cloneDisabled = this.data.source.findIndex(game => game.cloneof != null) === -1;
		this.data.filter.biosDisabled = this.data.source.findIndex(game => game.isbios == "yes") === -1;
		this.data.filter.deviceDisabled = this.data.source.findIndex(game => game.isdevice == "yes") === -1;
		const filterList = [];
		if (!this.data.filter.messDisabled) {
			filterList.push(this.FILTER_MESS);
		}
		if (!this.data.filter.cloneDisabled) {
			filterList.push(this.FILTER_CLONE);
		}
		if (!this.data.filter.biosDisabled && (this.params.value == "System / BIOS" || this.params.type == "bios")) {
			filterList.push(this.FILTER_BIOS);
		}
		if (!this.data.filter.deviceDisabled && (this.params.value == "System / Device" || this.params.type == "device")) {
			filterList.push(this.FILTER_DEVICE);
		}
		this._setFilterList(filterList);
	}
	_filterList() {
		this.data.list.data = this.data.source.filter((game) => {
			return !(
				(game.ismess && !this.data.filter.list.includes(this.FILTER_MESS)) ||
				(game.cloneof != null && !this.data.filter.list.includes(this.FILTER_CLONE)) ||
				(game.isbios == "yes" && !this.data.filter.list.includes(this.FILTER_BIOS)) ||
				(game.isdevice == "yes" && !this.data.filter.list.includes(this.FILTER_DEVICE))
			);
		});
	}
	_getInitData() {
		return {
			source: [],
			list: new ng.material.MatTableDataSource(),
			displayedColumns: ["icon", "description"],
			pageIndex: 0,
			filter: {
				messDisabled: true,
				cloneDisabled: true,
				biosDisabled: true,
				deviceDisabled: true,
				list: [],
				text: ""
			},
			title: ""
		};
	}
}

export default ResultModel;