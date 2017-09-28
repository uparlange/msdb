define(["AppUtils", "AbstractModule", "CommonModule", "ResultView", "ResultModel"],
	function (AppUtils, AbstractModule, CommonModule, ResultView, ResultModel) {
		return AppUtils.getLazyModuleClass({
			extends: AbstractModule,
			constructor: function ResultModule() {
				AbstractModule.call(this);
			},
			annotations: [
				new ng.core.NgModule({
					imports: [
						CommonModule,
						ng.router.RouterModule.forChild([
							{ path: "", component: ResultView }
						])
					],
					declarations: [
						ResultView
					],
					providers: [
						ResultModel
					]
				})
			]
		});
	}
);