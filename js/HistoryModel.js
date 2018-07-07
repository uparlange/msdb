import AbstractModel from "./AbstractModel.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import MsdbService from "./MsdbService.js";
import AppUtils from "./AppUtils.js";

class HistoryModel extends AbstractModel {
	static get parameters() {
		return AppUtils.getParameters(AbstractClassHelper, MsdbService);
	}
	constructor(AbstractClassHelper, MsdbService) {
		super(AbstractClassHelper, MsdbService);
	}
	onInit() {
		this.getHistory().getList().subscribe((list) => {
			this.data.list.data = list;
		});
	}
	_getInitData() {
		return {
			list: new ng.material.MatTableDataSource(),
			displayedColumns: ["icon", "label"]
		};
	}
}

export default HistoryModel;