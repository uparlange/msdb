define(["AbstractModule", "CommonModule", "MyGamesView", "MyGamesModel", "MyGamesCanActivate",
	"AppUtils"],
	function (AbstractModule, CommonModule, MyGamesView, MyGamesModel, MyGamesCanActivate,
		AppUtils) {
		return AppUtils.getLazyModuleClass({
			extends: AbstractModule,
			constructor: function MyGamesModule() {
				AbstractModule.call(this);
			},
			annotations: [
				new ng.core.NgModule({
					imports: [
						CommonModule,
						ng.router.RouterModule.forChild([
							{ path: "", component: MyGamesView, canActivate: [MyGamesCanActivate] }
						])
					],
					declarations: [
						MyGamesView
					],
					providers: [
						MyGamesModel,
						MyGamesCanActivate
					]
				})
			]
		});
	}
);