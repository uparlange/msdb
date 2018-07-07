import AbstractModule from "./AbstractModule.js";
import CommonModule from "./CommonModule.js";
import FavoritesView from "./FavoritesView.js";
import FavoritesModel from "./FavoritesModel.js";

class FavoritesModule extends AbstractModule {
	static get annotations() {
		return this.getAnnotations({
			imports: [
				CommonModule,
				ng.router.RouterModule.forChild([
					{ path: "", component: FavoritesView }
				])
			],
			declarations: [
				FavoritesView
			],
			providers: [
				FavoritesModel
			]
		});
	}
	constructor() {
		super();
	}
}

export default FavoritesModule;