import AbstractModule from "./AbstractModule.js";
import CommonModule from "./CommonModule.js";
import SearchByRatingsView from "./SearchByRatingsView.js";
import SearchByRatingsModel from "./SearchByRatingsModel.js";

class SearchByRatingsModule extends AbstractModule {
	static get annotations() {
		return this.getAnnotations({
			imports: [
				CommonModule,
				ng.router.RouterModule.forChild([
					{ path: "", component: SearchByRatingsView }
				])
			],
			declarations: [
				SearchByRatingsView
			],
			providers: [
				SearchByRatingsModel
			]
		});
	}
	constructor() {
		super();
	}
}

export default SearchByRatingsModule;