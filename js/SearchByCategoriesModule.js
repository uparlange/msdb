import AbstractModule from "./AbstractModule.js";
import CommonModule from "./CommonModule.js";
import SearchByCategoriesView from "./SearchByCategoriesView.js";
import SearchByCategoriesModel from "./SearchByCategoriesModel.js";

class SearchByCategoriesModule extends AbstractModule {
	static get annotations() {
		return this.getAnnotations({
			imports: [
				CommonModule,
				ng.router.RouterModule.forChild([
					{ path: "", component: SearchByCategoriesView }
				])
			],
			declarations: [
				SearchByCategoriesView
			],
			providers: [
				SearchByCategoriesModel
			]
		});
	}
	constructor() {
		super();
	}
}

export default SearchByCategoriesModule;