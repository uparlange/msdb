import AppUtils from "./AppUtils.js";
import AbstractModule from "./AbstractModule.js";
import CommonModule from "./CommonModule.js";
import SearchView from "./SearchView.js";
import SearchModel from "./SearchModel.js";

export default AppUtils.getClass({
	extends: AbstractModule,
	constructor: function SearchModule() {
		AbstractModule.call(this);
	},
	annotations: [
		new ng.core.NgModule({
			imports: [
				CommonModule,
				ng.router.RouterModule.forChild([
					{
						path: "",
						component: SearchView,
						children: [
							{ path: "description", loadChildren: AppUtils.loadModule("SearchByDescriptionModule") },
							{ path: "categories", loadChildren: AppUtils.loadModule("SearchByCategoriesModule") },
							{ path: "manufacturers", loadChildren: AppUtils.loadModule("SearchByManufacturersModule") },
							{ path: "series", loadChildren: AppUtils.loadModule("SearchBySeriesModule") },
							{ path: "years", loadChildren: AppUtils.loadModule("SearchByYearsModule") },
							{ path: "versions", loadChildren: AppUtils.loadModule("SearchByVersionsModule") },
							{ path: "ratings", loadChildren: AppUtils.loadModule("SearchByRatingsModule") }
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
		})
	]
});