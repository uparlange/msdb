define(["AbstractView", "HomeModel", "AppUtils"], 
function(AbstractView, HomeModel, AppUtils) 
{
	return ng.core.Component(AppUtils.getComponentConfiguration("home")).Class(
	{
		extends:AbstractView,
		constructor: [HomeModel, ng.router.ActivatedRoute, 
			function HomeView (HomeModel, ActivatedRoute)
			{
				AbstractView.call(this, HomeModel, ActivatedRoute);
			}
		]
	});	
});