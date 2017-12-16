define(["AppUtils", "AbstractModule", "CommonModule", "SearchByCategoriesView", "SearchByCategoriesModel"],
	function (AppUtils, AbstractModule, CommonModule, SearchByCategoriesView, SearchByCategoriesModel) {
		return AppUtils.getLazyModuleClass({
			extends: AbstractModule,
			constructor: function SearchByCategoriesModule() {
				AbstractModule.call(this);
			},
			annotations: [
				new ng.core.NgModule({
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
				})
			]
		});
	}
);