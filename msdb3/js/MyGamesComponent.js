define(["app:AbstractComponent", "app:MyGamesModel", "app:AppUtils"], 
function(AbstractComponent, MyGamesModel, AppUtils) 
{
	return ng.core.Component(AppUtils.getComponentConfiguration("myGames")).Class(
	{
		extends:AbstractComponent,
		constructor: [MyGamesModel, ng.router.ActivatedRoute,
			function (MyGamesModel, ActivatedRoute)
			{
				AbstractComponent.call(this, MyGamesModel, ActivatedRoute);
			}
		]
	});		
});