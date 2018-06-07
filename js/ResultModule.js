import AbstractModule from "./AbstractModule.js";
import CommonModule from "./CommonModule.js";
import ResultView from "./ResultView.js";
import ResultModel from "./ResultModel.js";

class ResultModule extends AbstractModule {
	static get annotations() {
		return this.getAnnotations({
			imports: [
				CommonModule,
				ng.router.RouterModule.forChild([
					{ path: "", component: ResultView }
				])
			],
			declarations: [
				ResultView
			],
			providers: [
				ResultModel
			]
		});
	}
	constructor() {
		super();
	}
}

export default ResultModule;