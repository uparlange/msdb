define(["app:AbstractViewComponent", "app:HomeModel", "app:AppUtils"], 
function(AbstractViewComponent, HomeModel, AppUtils) 
{
	const HomeComponent = function (HomeModel, ActivatedRoute)
	{
		AbstractViewComponent.call(this, HomeModel, ActivatedRoute);
	};
	
	return ng.core.Component(AppUtils.getComponentConfiguration("home")).Class(
	{
		extends:AbstractViewComponent,
		constructor: [HomeModel, ng.router.ActivatedRoute, HomeComponent]
	});	
});