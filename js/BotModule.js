import AbstractModule from "./AbstractModule.js";
import CommonModule from "./CommonModule.js";
import BotView from "./BotView.js";
import BotModel from "./BotModel.js";

class BotModule extends AbstractModule {
	static get annotations() {
		return this.getAnnotations({
			imports: [
				CommonModule,
				ng.router.RouterModule.forChild([
					{ path: "", component: BotView }
				])
			],
			declarations: [
				BotView
			],
			providers: [
				BotModel
			]
		});
	}
	constructor() {
		super();
	}
}

export default BotModule;