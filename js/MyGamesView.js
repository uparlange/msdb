import AbstractView from "./AbstractView.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import MyGamesModel from "./MyGamesModel.js";
import AppUtils from "./AppUtils.js";

class MyGamesView extends AbstractView {
	static get annotations() {
		return this.getAnnotations({ selector: "myGames" });
	}
	static get parameters() {
		return AppUtils.getParameters(AbstractClassHelper, MyGamesModel);
	}
	constructor(AbstractClassHelper, MyGamesModel) {
		super(AbstractClassHelper, MyGamesModel);
	}
}

export default MyGamesView;