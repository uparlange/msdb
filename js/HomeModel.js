import AbstractModel from "./AbstractModel.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import MsdbService from "./MsdbService.js";
import AppUtils from "./AppUtils.js";

class HomeModel extends AbstractModel {
	static get parameters() {
		return AppUtils.getParameters(AbstractClassHelper, MsdbService);
	}
	constructor(AbstractClassHelper, MsdbService) {
		super(AbstractClassHelper, MsdbService);
	}
	onInit() {
		this.getCache().getItem("searchLastType", "description").subscribe((value) => {
			this.data.searchLastType = value;
		});
	}
	onRefresh(callback) {
		if (this.data.mame.build === null) {
			this.getServices().getMameInfos().subscribe((data) => {
				if (data !== null) {
					data.version = data.build.substr(0, data.build.indexOf("(")).trim();
					this.data.mame = data;
				}
				callback();
			});
		}
	}
	_getInitData() {
		return {
			searchLastType: null,
			mame: {
				build: null
			}
		};
	}
}

export default HomeModel;