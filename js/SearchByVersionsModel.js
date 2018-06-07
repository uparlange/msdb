import AbstractModel from "./AbstractModel.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import MsdbService from "./MsdbService.js";

class SearchByVersionsModel extends AbstractModel {
	static get parameters() {
		return this.getParameters(AbstractClassHelper, MsdbService);
	}
	constructor(AbstractClassHelper, MsdbService) {
		super(AbstractClassHelper, MsdbService);
	}
	onRefresh(callback) {
		this._refreshList().subscribe(() => {
			callback();
		});
	}
	trackByLabel(index, item) {
		return item ? item.label : undefined;
	}
	getVersion(value) {
		let version = value;
		version = version.replace("0.00", "0");
		version = version.replace("0.0", "0");
		version = version.replace("0.", "0");
		return version.toLowerCase();
	}
	changeLogAvailable(value) {
		return (value.indexOf("u") === -1 && value.indexOf("b") === -1);
	}
	_refreshList() {
		const eventEmitter = new ng.core.EventEmitter();
		if (this.data.list === null) {
			this.getServices().getVersions().subscribe((data) => {
				this.data.list = this.getGroupedArrayByItemsNumber(data, 20);
				eventEmitter.emit();
			});
		} else {
			setTimeout(() => {
				eventEmitter.emit();
			}, 0);
		}
		return eventEmitter;
	}
	_getInitData() {
		return {
			list: null
		};
	}
}

export default SearchByVersionsModel;