define(["AbstractView", "ConfigModel", "AppUtils"], 
function(AbstractView, ConfigModel, AppUtils) 
{
	const conf = AppUtils.getComponentConfiguration("config");

	return ng.core.Component(conf).Class(
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