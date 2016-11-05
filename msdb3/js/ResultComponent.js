define(["app:AbstractComponent", "app:ResultModel", "app:AppUtils"], 
function(AbstractComponent, ResultModel, AppUtils) 
{
	return ng.core.Component(AppUtils.getComponentConfiguration("result")).Class(
	{
		extends:AbstractComponent,
		constructor: [ResultModel, ng.router.ActivatedRoute,
			function (ResultModel, ActivatedRoute)
			{
				AbstractComponent.call(this, ResultModel, ActivatedRoute);
			}
		]
	});		
});