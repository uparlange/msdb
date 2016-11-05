define(["app:AbstractComponent", "app:HomeModel", "app:AppUtils"], 
function(AbstractComponent, HomeModel, AppUtils) 
{
	return ng.core.Component(AppUtils.getComponentConfiguration("home")).Class(
	{
		extends:AbstractComponent,
		constructor: [HomeModel, ng.router.ActivatedRoute,
			function (model, activatedRoute)
			{
				AbstractComponent.call(this, model, activatedRoute);
			}
		]
	});	
});