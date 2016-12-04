define(["app:AbstractView", "app:MyGamesModel", "app:AppUtils"], 
function(AbstractView, MyGamesModel, AppUtils) 
{
	return ng.core.Component(AppUtils.getComponentConfiguration("myGames")).Class(
	{
		extends:AbstractView,
		constructor: [MyGamesModel, ng.router.ActivatedRoute, 
			function MyGamesView (MyGamesModel, ActivatedRoute)
			{
				AbstractView.call(this, MyGamesModel, ActivatedRoute);
			}
		]
	});		
});