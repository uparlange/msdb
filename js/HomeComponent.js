define(["app:HomeModel", "app:AppUtils"], 
function(HomeModel, AppUtils) 
{
	const componentName = "home";
	
	return ng.core.Component({
		selector: componentName,
		templateUrl: AppUtils.getTemplateUrl(componentName)
	}).Class({
		constructor: [HomeModel,
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