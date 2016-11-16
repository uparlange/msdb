define(["app:AbstractView", "app:HomeModel", "app:AppUtils"], 
function(AbstractView, HomeModel, AppUtils) 
{
	const HomeView = function (HomeModel, ActivatedRoute)
	{
		AbstractView.call(this, HomeModel, ActivatedRoute);
	};
	
	return ng.core.Component(AppUtils.getComponentConfiguration("home")).Class(
	{
		extends:AbstractView,
		constructor: [HomeModel, ng.router.ActivatedRoute, HomeView]
	});	
});