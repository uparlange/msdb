import AbstractModel from "./AbstractModel.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import MsdbService from "./MsdbService.js";

class ResultModel extends AbstractModel {
	static get parameters() {
		return this.getParameters(AbstractClassHelper, MsdbService);
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
		this.data = this._getInitData();
		this.getServices().search(this.params.type, this.params.value).subscribe((data) => {
			this.data.count = Array.isArray(data) ? data.length : 0;
			this.data.list = this.getGroupedArrayByFirstLetter(data, "description");
			callback();
		});
	}
	canShowGame(game) {
		return (
			(game.category !== this.SYSTEM_DEVICE && game.category !== this.SYSTEM_BIOS && game.cloneof == null) ||
			(game.cloneof != null && this.showClone) ||
			(game.category === this.SYSTEM_DEVICE && this.showDevice) ||
			(game.category === this.SYSTEM_BIOS && this.showBios)
		)
	}
	getSearchLabel(type) {
		return (type) ? "L10N_SEARCH_BY_" + type.toUpperCase() : "";
	}
	trackByLabel(index, item) {
		return item ? item.label : undefined;
	}
	trackByName(index, item) {
		return item ? item.name : undefined;
	}
	_getInitData() {
		return {
			list: [],
			count: -1
		};
	}
}

export default ResultModel;