define(["AppUtils", "AbstractModule", "CommonModule", "BotView", "BotModel"],
	function (AppUtils, AbstractModule, CommonModule, BotView, BotModel) {
		return AppUtils.getLazyModuleClass({
			extends: AbstractModule,
			constructor: function BotModule() {
				AbstractModule.call(this);
			},
			annotations: [
				new ng.core.NgModule({
					imports: [
						CommonModule,
						ng.router.RouterModule.forChild([
							{ path: "", component: BotView }
						])
					],
					declarations: [
						BotView
					],
					providers: [
						BotModel
					]
				})
			]
		});
	}
);