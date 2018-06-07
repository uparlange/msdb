import AbstractModule from "./AbstractModule.js";
import CommonModule from "./CommonModule.js";
import MyGamesView from "./MyGamesView.js";
import MyGamesModel from "./MyGamesModel.js";
import MyGamesCanActivate from "./MyGamesCanActivate.js";

class MyGamesModule extends AbstractModule {
	static get annotations() {
		return this.getAnnotations({
			imports: [
				CommonModule,
				ng.router.RouterModule.forChild([
					{ path: "", component: MyGamesView, canActivate: [MyGamesCanActivate] }
				])
			],
			declarations: [
				MyGamesView
			],
			providers: [
				MyGamesModel,
				MyGamesCanActivate
			]
		});
	}
	constructor() {
		super();
	}
}

export default MyGamesModule;