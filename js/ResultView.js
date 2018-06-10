import AbstractView from "./AbstractView.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import ResultModel from "./ResultModel.js";
import AppUtils from "./AppUtils.js";

class ResultView extends AbstractView {
	static get annotations() {
		return this.getAnnotations({
			selector: "result",
			queries: {
				paginator: new ng.core.ViewChild(ng.material.MatPaginator)
			}
		});
	}
	static get parameters() {
		return AppUtils.getParameters(AbstractClassHelper, ResultModel);
	}
	constructor(AbstractClassHelper, ResultModel) {
		super(AbstractClassHelper, ResultModel);
	}
	onInit() {
		this.model.setPaginator(this.paginator);
	}
}

export default ResultView;