define(["app:HomeProvider", "app:AppUtils"], 
function(HomeProvider, AppUtils) 
{
	const componentName = "home";
	
	return ng.core.Component({
		selector: componentName,
		templateUrl: AppUtils.getTemplateUrl(componentName)
	}).Class({
		constructor: [HomeProvider,
			function (model)
			{
				this.model = model;
			}
		],
		ngOnInit : function()
		{
			this.model.init();
		},
		ngOnDestroy : function()
		{
			this.model.destroy();
		}
	});	
});