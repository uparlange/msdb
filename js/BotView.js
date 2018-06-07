import AbstractView from "./AbstractView.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import BotModel from "./BotModel.js";

class BotView extends AbstractView {
	static get annotations() {
		return this.getAnnotations({ selector: "bot" });
	}
	static get parameters() {
		return this.getParameters(AbstractClassHelper, BotModel);
	}
	constructor(AbstractClassHelper, BotModel) {
		super(AbstractClassHelper, BotModel);
	}
}

export default BotView;