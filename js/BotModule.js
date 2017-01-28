define(["AbstractModule", "CommonModule", "BotView", "BotModel"], 
function(AbstractModule, CommonModule, BotView, BotModel)
{
	return {
		module:ng.core.NgModule({
			imports:[
				CommonModule,
				ng.router.RouterModule.forChild([
					{path: "", component: BotView}
				])
			],
			declarations:[
				BotView
			],
			providers:[
				BotModel
			]
		}).Class({
			extends:AbstractModule,
			constructor:[
				function BotModule ()
				{
					AbstractModule.call(this);
				}
			] 
		})
	};
});