define(["app:AbstractComponent", "app:AppModel", "app:AppUtils"], 
function(AbstractComponent, AppModel, AppUtils) 
{
	return ng.core.Component(AppUtils.getComponentConfiguration("app")).Class(
	{
		extends:AbstractComponent,
		constructor: [AppModel, ng.router.ActivatedRoute,
			function (model, activatedRoute)
			{
				AbstractComponent.call(this, model, activatedRoute);
			}
		]
	});
});