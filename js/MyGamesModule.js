define(["app:AbstractModule", "app:CommonModule", "app:MyGamesComponent", "app:MyGamesModel"], 
function(AbstractModule, CommonModule, MyGamesComponent, MyGamesModel)
{
	const MyGamesModule = function ()
	{
		AbstractModule.call(this);
	};
	
	return ng.core.NgModule({
		imports:[
			CommonModule,
			ng.router.RouterModule.forChild([
				{path: "", component: MyGamesComponent}
			])
		],
		declarations:[
			MyGamesComponent
		],
		providers:[
			MyGamesModel
		]
	}).Class({
		extends:AbstractModule,
		constructor:MyGamesModule
	});
});