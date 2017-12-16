define(["AppUtils", "AbstractModule", "CommonModule", "SearchByYearsView", "SearchByYearsModel"],
	function (AppUtils, AbstractModule, CommonModule, SearchByYearsView, SearchByYearsModel) {
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
							{ path: "", component: SearchByYearsView }
						])
					],
					declarations: [
						SearchByYearsView
					],
					providers: [
						SearchByYearsModel
					]
				})
			]
		});
	}
);