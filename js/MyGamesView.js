define(["AbstractView", "MyGamesModel", "AppUtils"], 
function(AbstractView, MyGamesModel, AppUtils) 
{
	const conf = AppUtils.getComponentConfiguration("myGames");

	return ng.core.Component(conf).Class(
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