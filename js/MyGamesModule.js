define(["AbstractModule", "CommonModule", "MyGamesView", "MyGamesModel"], 
function(AbstractModule, CommonModule, MyGamesView, MyGamesModel)
{
	return {
		module:ng.core.NgModule({
			imports:[
				CommonModule,
				ng.router.RouterModule.forChild([
					{path: "", component: MyGamesView}
				])
			],
			declarations:[
				MyGamesView
			],
			providers:[
				MyGamesModel
			]
		}).Class({
			extends:AbstractModule,
			constructor:[
				function MyGamesModule ()
				{
					AbstractModule.call(this);
				}
			]
		})
	};
});