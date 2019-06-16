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
		window.dataLayer = window.dataLayer || [];
		this._gtag("js", new Date());
		this._gtag("config", this._gaMeasurementId);
		AppUtils.loadScript({
			src: "https://www.googletagmanager.com/gtag/js?id=" + this._gaMeasurementId,
			async: true
		});
	}
	setCurrentPage(url) {
		this._gtag("config", this._gaMeasurementId, { "page_path": url });
	}
	_gtag() {
		window.dataLayer.push(arguments);
	}
}

export default AnalyticsManager;