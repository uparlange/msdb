define(["AppUtils", "AbstractModule", "CommonModule", "SearchByManufacturersView", "SearchByManufacturersModel"],
	function (AppUtils, AbstractModule, CommonModule, SearchByManufacturersView, SearchByManufacturersModel) {
		return AppUtils.getLazyModuleClass({
			extends: AbstractModule,
			constructor: function SearchByManufacturersModule() {
				AbstractModule.call(this);
			},
			annotations: [
				new ng.core.NgModule({
					imports: [
						CommonModule,
						ng.router.RouterModule.forChild([
							{ path: "", component: SearchByManufacturersView }
						])
					],
					declarations: [
						SearchByManufacturersView
					],
					providers: [
						SearchByManufacturersModel
					]
				})
			]
		});
	}
);