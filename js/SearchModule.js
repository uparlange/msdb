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
							{ path: "", component: SearchView }
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