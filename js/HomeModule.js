define(["AppUtils", "AbstractModule", "CommonModule", "HomeView", "HomeModel"],
	function (AppUtils, AbstractModule, CommonModule, HomeView, HomeModel) {
		return AppUtils.getLazyModuleClass({
			extends: AbstractModule,
			constructor: function HomeModule() {
				AbstractModule.call(this);
			},
			annotations: [
				new ng.core.NgModule({
					imports: [
						CommonModule,
						ng.router.RouterModule.forChild([
							{ path: "", component: HomeView }
						])
					],
					declarations: [
						HomeView
					],
					providers: [
						HomeModel
					]
				})
			]
		});
	}
);