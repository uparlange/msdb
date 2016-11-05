define(["app:AbstractViewComponent", "app:MyGamesModel", "app:AppUtils"], 
function(AbstractViewComponent, MyGamesModel, AppUtils) 
{
	return ng.core.Component(AppUtils.getComponentConfiguration("myGames")).Class(
	{
		extends:AbstractViewComponent,
		constructor: [MyGamesModel, ng.router.ActivatedRoute,
			function (MyGamesModel, ActivatedRoute)
			{
				AbstractViewComponent.call(this, MyGamesModel, ActivatedRoute);
			}
		]
	});		
});