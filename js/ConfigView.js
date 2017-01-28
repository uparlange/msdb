define(["AbstractView", "ConfigModel", "AppUtils"], 
function(AbstractView, ConfigModel, AppUtils) 
{
	return ng.core.Component(AppUtils.getComponentConfiguration("config")).Class(
	{
		extends:AbstractView,
		constructor: [ConfigModel, ng.router.ActivatedRoute, 
			function ConfigView (ConfigModel, ActivatedRoute)
			{
				AbstractView.call(this, ConfigModel, ActivatedRoute);
			}
		]
	});	
});