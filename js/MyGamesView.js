import AbstractView from "./AbstractView.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import MyGamesModel from "./MyGamesModel.js";

class MyGamesView extends AbstractView {
	static get annotations() {
		return this.getAnnotations({ selector: "myGames" });
	}
	static get parameters() {
		return this.getParameters(AbstractClassHelper, MyGamesModel);
	}
	constructor(AbstractClassHelper, MyGamesModel) {
		super(AbstractClassHelper, MyGamesModel);
	}
}

export default MyGamesView;