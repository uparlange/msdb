import AbstractView from "./AbstractView.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import FavoritesModel from "./FavoritesModel.js";
import AppUtils from "./AppUtils.js";

class FavoritesView extends AbstractView {
	static get annotations() {
		return this.getAnnotations({ selector: "favorites" });
	}
	static get parameters() {
		return AppUtils.getParameters(AbstractClassHelper, FavoritesModel);
	}
	constructor(AbstractClassHelper, FavoritesModel) {
		super(AbstractClassHelper, FavoritesModel);
	}
}

export default FavoritesView;