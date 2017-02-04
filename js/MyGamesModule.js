define(["AbstractModule", "CommonModule", "MyGamesView", "MyGamesModel", "MyGamesCanActivate"], 
function(AbstractModule, CommonModule, MyGamesView, MyGamesModel, MyGamesCanActivate)
{
	return {
		module:ng.core.NgModule({
			imports:[
				CommonModule,
				ng.router.RouterModule.forChild([
					{path: "", component: MyGamesView, canActivate:[MyGamesCanActivate]}
				])
			],
			declarations:[
				MyGamesView
			],
			providers:[
				MyGamesModel,
				MyGamesCanActivate
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