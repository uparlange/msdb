define(["AppUtils", "AbstractModule", "CommonModule", "SearchByDescriptionView", "SearchByDescriptionModel"],
	function (AppUtils, AbstractModule, CommonModule, SearchByDescriptionView, SearchByDescriptionModel) {
		return AppUtils.getLazyModuleClass({
			extends: AbstractModule,
			constructor: function SearchByDescriptionModule() {
				AbstractModule.call(this);
			},
			annotations: [
				new ng.core.NgModule({
					imports: [
						CommonModule,
						ng.router.RouterModule.forChild([
							{ path: "", component: SearchByDescriptionView }
						])
					],
					declarations: [
						SearchByDescriptionView
					],
					providers: [
						SearchByDescriptionModel
					]
				})
			]
		});
	}
);