define(["AppUtils", "AbstractModule", "CommonModule", "SearchView", "SearchModel"],
	function (AppUtils, AbstractModule, CommonModule, SearchView, SearchModel) {
		return AppUtils.getLazyModuleClass({
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
									{ path: "description", loadChildren: AppUtils.getLazyModuleName("SearchByDescriptionModule") },
									{ path: "categories", loadChildren: AppUtils.getLazyModuleName("SearchByCategoriesModule") },
									{ path: "manufacturers", loadChildren: AppUtils.getLazyModuleName("SearchByManufacturersModule") },
									{ path: "series", loadChildren: AppUtils.getLazyModuleName("SearchBySeriesModule") },
									{ path: "years", loadChildren: AppUtils.getLazyModuleName("SearchByYearsModule") },
									{ path: "versions", loadChildren: AppUtils.getLazyModuleName("SearchByVersionsModule") },
									{ path: "ratings", loadChildren: AppUtils.getLazyModuleName("SearchByRatingsModule") }
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
	}
);