import AbstractView from "./AbstractView.js"
import AbstractClassHelper from "./AbstractClassHelper.js"
import HomeModel from "./HomeModel.js"

class HomeView extends AbstractView {
	static get annotations() {
		return this.getAnnotations({ selector: "home" });
	}
	static get parameters() {
		return this.getParameters(AbstractClassHelper, HomeModel);
	}
	constructor(AbstractClassHelper, HomeModel) {
		super(AbstractClassHelper, HomeModel);
	}
}

export default HomeView;