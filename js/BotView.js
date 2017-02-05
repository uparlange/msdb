define(["AbstractView", "BotModel", "AppUtils"], 
function(AbstractView, BotModel, AppUtils) 
{
	const conf = AppUtils.getComponentConfiguration("bot");

	return ng.core.Component(conf).Class(
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