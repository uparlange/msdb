import AppUtils from "./AppUtils.js";
import AbstractManager from "./AbstractManager.js";

class AnalyticsManager extends AbstractManager {
	static get parameters() {
		return AppUtils.getParameters();
	}
	constructor() {
		super();
		this._gaMeasurementId = "UA-141763528-1";
	}
	init() {
		super.init();
		// TODO move index code to this manager
	}
	setCurrentPage(url) {
		try {
			gtag("config", this._gaMeasurementId, { "page_path": url });
		} catch (e) {
			this.getLogger().error("Unable to update page (" + url + ") to Google Analytics");
		}
	}
}

export default AnalyticsManager;