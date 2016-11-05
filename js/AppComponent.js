define(["app:AbstractViewComponent", "app:AppModel", "app:AppUtils"], 
function(AbstractViewComponent, AppModel, AppUtils) 
{
	return ng.core.Component(AppUtils.getComponentConfiguration("app")).Class(
	{
		extends:AbstractViewComponent,
		constructor: [AppModel, ng.router.ActivatedRoute,
			function (AppModel, ActivatedRoute)
			{
				AbstractViewComponent.call(this, AppModel, ActivatedRoute);
			}
		]
	});
});