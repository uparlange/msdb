define(["AppUtils", "AbstractModule", "CommonModule", "SearchByRatingsView", "SearchByRatingsModel"],
	function (AppUtils, AbstractModule, CommonModule, SearchByRatingsView, SearchByRatingsModel) {
		return AppUtils.getLazyModuleClass({
			extends: AbstractModule,
			constructor: function SearchByYearsModule() {
				AbstractModule.call(this);
			},
			annotations: [
				new ng.core.NgModule({
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
				})
			]
		});
	}
);