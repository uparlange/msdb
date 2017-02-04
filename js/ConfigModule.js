define(["AbstractModule", "CommonModule", "ConfigView", "ConfigModel", "ConfigCanActivate",
		"ConfigCanDeactivate"], 
function(AbstractModule, CommonModule, ConfigView, ConfigModel, ConfigCanActivate,
		ConfigCanDeactivate)
{
	return {
		module:ng.core.NgModule({
			imports:[
				CommonModule,
				ng.router.RouterModule.forChild([
					{path: "", component: ConfigView, canActivate:[ConfigCanActivate], canDeactivate:[ConfigCanDeactivate]}
				])
			],
			declarations:[
				ConfigView
			],
			providers:[
				ConfigModel,
				ConfigCanActivate,
				ConfigCanDeactivate
			]
		}).Class({
			extends:AbstractModule,
			constructor:[
				function ConfigModule ()
				{
					AbstractModule.call(this);
				}
			] 
		})
	};
});