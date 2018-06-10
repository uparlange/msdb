import AbstractView from "./AbstractView.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import BotModel from "./BotModel.js";
import AppUtils from "./AppUtils.js";

class BotView extends AbstractView {
	static get annotations() {
		return this.getAnnotations({ selector: "bot" });
	}
	static get parameters() {
		return AppUtils.getParameters(AbstractClassHelper, BotModel);
	}
	constructor(AbstractClassHelper, BotModel) {
		super(AbstractClassHelper, BotModel);
	}
}

export default BotView;