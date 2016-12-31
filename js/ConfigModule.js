define(["app:AbstractModule", "app:CommonModule", "app:ConfigView", "app:ConfigModel"], 
function(AbstractModule, CommonModule, ConfigView, ConfigModel)
{
	return {
		module:ng.core.NgModule({
			imports:[
				CommonModule,
				ng.router.RouterModule.forChild([
					{path: "", component: ConfigView}
				])
			],
			declarations:[
				ConfigView
			],
			providers:[
				ConfigModel
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