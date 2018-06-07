import AbstractModel from "./AbstractModel.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import MsdbService from "./MsdbService.js";

class SearchByManufacturersModel extends AbstractModel {
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
	_refreshList() {
		const eventEmitter = new ng.core.EventEmitter();
		if (this.data.list === null) {
			this.getServices().getManufacturers().subscribe((data) => {
				this.data.list = this.getGroupedArrayByFirstLetter(data, "label");
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

export default SearchByManufacturersModel;