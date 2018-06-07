import AbstractView from "./AbstractView.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import ResultModel from "./ResultModel.js";

class ResultView extends AbstractView {
	static get annotations() {
		return this.getAnnotations({ selector: "result" });
	}
	static get parameters() {
		return this.getParameters(AbstractClassHelper, ResultModel);
	}
	constructor(AbstractClassHelper, ResultModel) {
		super(AbstractClassHelper, ResultModel);
	}
}

export default ResultView;