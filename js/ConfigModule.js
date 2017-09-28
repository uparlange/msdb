define(["AbstractModule", "CommonModule", "ConfigView", "ConfigModel", "ConfigCanActivate",
	"ConfigCanDeactivate", "AppUtils"],
	function (AbstractModule, CommonModule, ConfigView, ConfigModel, ConfigCanActivate,
		ConfigCanDeactivate, AppUtils) {
		return AppUtils.getLazyModuleClass({
			extends: AbstractModule,
			constructor: function ConfigModule() {
				AbstractModule.call(this);
			},
			annotations: [
				new ng.core.NgModule({
					imports: [
						CommonModule,
						ng.router.RouterModule.forChild([
							{ path: "", component: ConfigView, canActivate: [ConfigCanActivate], canDeactivate: [ConfigCanDeactivate] }
						])
					],
					declarations: [
						ConfigView
					],
					providers: [
						ConfigModel,
						ConfigCanActivate,
						ConfigCanDeactivate
					]
				})
			]
		});
	}
);