define(["AbstractView", "HomeModel", "AppUtils"], 
function(AbstractView, HomeModel, AppUtils) 
{
	const conf = AppUtils.getComponentConfiguration("home");

	return ng.core.Component(conf).Class(
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