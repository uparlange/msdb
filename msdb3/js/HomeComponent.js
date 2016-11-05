define(["app:AbstractComponent", "app:HomeModel", "app:AppUtils"], 
function(AbstractComponent, HomeModel, AppUtils) 
{
	return ng.core.Component(AppUtils.getComponentConfiguration("home")).Class(
	{
		extends:AbstractComponent,
		constructor: [HomeModel, ng.router.ActivatedRoute,
			function (HomeModel, ActivatedRoute)
			{
				AbstractComponent.call(this, HomeModel, ActivatedRoute);
			}
		]
	});	
});