import AbstractModule from "./AbstractModule.js";
import CommonModule from "./CommonModule.js";
import HistoryView from "./HistoryView.js";
import HistoryModel from "./HistoryModel.js";

class HistoryModule extends AbstractModule {
	static get annotations() {
		return this.getAnnotations({
			imports: [
				CommonModule,
				ng.router.RouterModule.forChild([
					{ path: "", component: HistoryView }
				])
			],
			declarations: [
				HistoryView
			],
			providers: [
				HistoryModel
			]
		});
	}
	constructor() {
		super();
	}
}

export default HistoryModule;