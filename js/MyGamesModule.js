define(["app:CommonModule", "app:MyGamesComponent", "app:MyGamesModel"], 
function(CommonModule, MyGamesComponent, MyGamesModel)
{
	const routes = [
		{path: "", component: MyGamesComponent}
	];
	
	return ng.core.NgModule({
		imports:[
			CommonModule,
			ng.router.RouterModule.forChild(routes)
		],
		declarations:[
			MyGamesComponent
		],
		providers:[
			MyGamesModel
		]
	}).Class({
		constructor: function ()
		{
			
		}
	});
});