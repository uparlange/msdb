import AbstractView from "./AbstractView.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import HistoryModel from "./HistoryModel.js";
import AppUtils from "./AppUtils.js";

class HistoryView extends AbstractView {
	static get annotations() {
		return this.getAnnotations({ selector: "history" });
	}
	static get parameters() {
		return AppUtils.getParameters(AbstractClassHelper, HistoryModel);
	}
	constructor(AbstractClassHelper, HistoryModel) {
		super(AbstractClassHelper, HistoryModel);
	}
}

export default HistoryView;