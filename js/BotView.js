define(["AbstractView", "BotModel", "AppUtils"], 
function(AbstractView, BotModel, AppUtils) 
{
	return ng.core.Component(AppUtils.getComponentConfiguration("bot")).Class(
	{
		extends:AbstractView,
		constructor: [BotModel, ng.router.ActivatedRoute, 
			function BotView (BotModel, ActivatedRoute)
			{
				AbstractView.call(this, BotModel, ActivatedRoute);
			}
		]
	});	
});