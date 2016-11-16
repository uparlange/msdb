define(["app:AbstractView", "app:MyGamesModel", "app:AppUtils"], 
function(AbstractView, MyGamesModel, AppUtils) 
{
	const MyGamesView = function (MyGamesModel, ActivatedRoute)
	{
		AbstractView.call(this, MyGamesModel, ActivatedRoute);
	};
	
	return ng.core.Component(AppUtils.getComponentConfiguration("myGames")).Class(
	{
		extends:AbstractView,
		constructor: [MyGamesModel, ng.router.ActivatedRoute, MyGamesView]
	});		
});