define(["app:AbstractModule", "app:CommonModule", "app:MyGamesView", "app:MyGamesModel"], 
function(AbstractModule, CommonModule, MyGamesView, MyGamesModel)
{
	const MyGamesModule = function ()
	{
		AbstractModule.call(this);
	};
	
	return ng.core.NgModule({
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
		constructor:[MyGamesModule]
	});
});