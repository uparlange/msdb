define(["AppUtils", "AbstractModule", "CommonModule", "SearchBySeriesView", "SearchBySeriesModel"],
	function (AppUtils, AbstractModule, CommonModule, SearchBySeriesView, SearchBySeriesModel) {
		return AppUtils.getLazyModuleClass({
			extends: AbstractModule,
			constructor: function SearchBySeriesModule() {
				AbstractModule.call(this);
			},
			annotations: [
				new ng.core.NgModule({
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
				})
			]
		});
	}
);