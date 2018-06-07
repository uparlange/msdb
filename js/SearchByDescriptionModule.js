import AbstractModule from "./AbstractModule.js";
import CommonModule from "./CommonModule.js";
import SearchByDescriptionView from "./SearchByDescriptionView.js";
import SearchByDescriptionModel from "./SearchByDescriptionModel.js";

class SearchByDescriptionModule extends AbstractModule {
	static get annotations() {
		return this.getAnnotations({
			imports: [
				CommonModule,
				ng.router.RouterModule.forChild([
					{ path: "", component: SearchByDescriptionView }
				])
			],
			declarations: [
				SearchByDescriptionView
			],
			providers: [
				SearchByDescriptionModel
			]
		});
	}
	constructor() {
		super();
	}
}

export default SearchByDescriptionModule;