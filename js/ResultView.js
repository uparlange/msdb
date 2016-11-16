define(["app:AbstractView", "app:ResultModel", "app:AppUtils"], 
function(AbstractView, ResultModel, AppUtils) 
{
	const ResultView = function (ResultModel, ActivatedRoute)
	{
		AbstractView.call(this, ResultModel, ActivatedRoute);
	};
	
	return ng.core.Component(AppUtils.getComponentConfiguration("result")).Class(
	{
		extends:AbstractView,
		constructor: [ResultModel, ng.router.ActivatedRoute, ResultView]
	});		
});