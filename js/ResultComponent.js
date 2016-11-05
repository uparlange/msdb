define(["app:AbstractViewComponent", "app:ResultModel", "app:AppUtils"], 
function(AbstractViewComponent, ResultModel, AppUtils) 
{
	return ng.core.Component(AppUtils.getComponentConfiguration("result")).Class(
	{
		extends:AbstractViewComponent,
		constructor: [ResultModel, ng.router.ActivatedRoute,
			function (ResultModel, ActivatedRoute)
			{
				AbstractViewComponent.call(this, ResultModel, ActivatedRoute);
			}
		]
	});		
});