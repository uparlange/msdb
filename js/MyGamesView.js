import AbstractView from "./AbstractView.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import MyGamesModel from "./MyGamesModel.js";
import AppUtils from "./AppUtils.js";

class MyGamesView extends AbstractView {
	static get annotations() {
		return this.getAnnotations({
			selector: "myGames",
			queries: {
				paginator: new ng.core.ViewChild(ng.material.MatPaginator)
			}
		});
	}
	static get parameters() {
		return AppUtils.getParameters(AbstractClassHelper, MyGamesModel);
	}
	constructor(AbstractClassHelper, MyGamesModel) {
		super(AbstractClassHelper, MyGamesModel);
	}
	onInit() {
		this.model.setPaginator(this.paginator);
	}
}

export default MyGamesView;