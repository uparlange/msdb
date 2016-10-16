define(["app:CommonModule", "app:MyGamesComponent", "app:MyGamesProvider"], 
function(CommonModule, MyGamesComponent, MyGamesProvider)
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
			MyGamesProvider
		]
	}).Class({
		constructor: function ()
		{
			
		}
	});
});