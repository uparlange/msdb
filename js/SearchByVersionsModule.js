define(["AppUtils", "AbstractModule", "CommonModule", "SearchByVersionsView", "SearchByVersionsModel"],
	function (AppUtils, AbstractModule, CommonModule, SearchByVersionsView, SearchByVersionsModel) {
		return AppUtils.getLazyModuleClass({
			extends: AbstractModule,
			constructor: function SearchByVersionsModule() {
				AbstractModule.call(this);
			},
			annotations: [
				new ng.core.NgModule({
					imports: [
						CommonModule,
						ng.router.RouterModule.forChild([
							{ path: "", component: SearchByVersionsView }
						])
					],
					declarations: [
						SearchByVersionsView
					],
					providers: [
						SearchByVersionsModel
					]
				})
			]
		});
	}
);