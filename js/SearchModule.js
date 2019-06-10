import AbstractModule from "./AbstractModule.js";
import CommonModule from "./CommonModule.js";
import SearchView from "./SearchView.js";
import SearchModel from "./SearchModel.js";

class SearchModule extends AbstractModule {
	static get annotations() {
		return this.getAnnotations({
			imports: [
				CommonModule,
				ng.router.RouterModule.forChild([
					{
						path: "",
						component: SearchView,
						children: [
							{ path: "description", loadChildren: this.getLazyModule("SearchByDescriptionModule") },
							{ path: "categories", loadChildren: this.getLazyModule("SearchByCategoriesModule") },
							{ path: "manufacturers", loadChildren: this.getLazyModule("SearchByManufacturersModule") },
							{ path: "series", loadChildren: this.getLazyModule("SearchBySeriesModule") },
							{ path: "years", loadChildren: this.getLazyModule("SearchByYearsModule") },
							{ path: "versions", loadChildren: this.getLazyModule("SearchByVersionsModule") },
							{ path: "ratings", loadChildren: this.getLazyModule("SearchByRatingsModule") },
							{ path: "languages", loadChildren: this.getLazyModule("SearchByLanguagesModule") }
						]
					}
				])
			],
			declarations: [
				SearchView
			],
			providers: [
				SearchModel
			]
		});
	}
	constructor() {
		super();
	}
}

export default SearchModule;