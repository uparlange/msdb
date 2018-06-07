import AbstractModule from "./AbstractModule.js";
import CommonModule from "./CommonModule.js";
import SearchBySeriesView from "./SearchBySeriesView.js";
import SearchBySeriesModel from "./SearchBySeriesModel.js";

class SearchBySeriesModule extends AbstractModule {
	static get annotations() {
		return this.getAnnotations({
			imports: [
				CommonModule,
				ng.router.RouterModule.forChild([
					{ path: "", component: SearchBySeriesView }
				])
			],
			declarations: [
				SearchBySeriesView
			],
			providers: [
				SearchBySeriesModel
			]
		});
	}
	constructor() {
		super();
	}
}

export default SearchBySeriesModule;