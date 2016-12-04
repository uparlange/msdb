define(["app:AbstractView", "app:ResultModel", "app:AppUtils"], 
function(AbstractView, ResultModel, AppUtils) 
{
	return ng.core.Component(AppUtils.getComponentConfiguration("result")).Class(
	{
		extends:AbstractView,
		constructor: [ResultModel, ng.router.ActivatedRoute, 
			function ResultView (ResultModel, ActivatedRoute)
			{
				AbstractView.call(this, ResultModel, ActivatedRoute);
			}
		]
	});		
});