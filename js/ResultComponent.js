define(["app:AbstractViewComponent", "app:ResultModel", "app:AppUtils"], 
function(AbstractViewComponent, ResultModel, AppUtils) 
{
	const ResultComponent = function (ResultModel, ActivatedRoute)
	{
		AbstractViewComponent.call(this, ResultModel, ActivatedRoute);
	};
	
	return ng.core.Component(AppUtils.getComponentConfiguration("result")).Class(
	{
		extends:AbstractViewComponent,
		constructor: [ResultModel, ng.router.ActivatedRoute, ResultComponent]
	});		
});