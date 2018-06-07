import AbstractModule from "./AbstractModule.js";
import CommonModule from "./CommonModule.js";
import HomeView from "./HomeView.js";
import HomeModel from "./HomeModel.js";

class HomeModule extends AbstractModule {
	static get annotations() {
		return this.getAnnotations({
			imports: [
				CommonModule,
				ng.router.RouterModule.forChild([
					{ path: "", component: HomeView }
				])
			],
			declarations: [
				HomeView
			],
			providers: [
				HomeModel
			]
		});
	}
	constructor() {
		super();
	}
}

export default HomeModule;