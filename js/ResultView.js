define(["AbstractView", "ResultModel", "AppUtils"], 
function(AbstractView, ResultModel, AppUtils) 
{
	const conf = AppUtils.getComponentConfiguration("result");

	return ng.core.Component(conf).Class(
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