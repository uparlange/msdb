define(["app:UpdateProvider", "app:AppUtils"], 
function(UpdateProvider, AppUtils) 
{
	const componentName = "update";
	
	return ng.core.Component({
		selector: componentName,
		templateUrl: AppUtils.getTemplateUrl(componentName)
	}).Class({
		constructor: [UpdateProvider,
			function (model)
			{
				this.model = model;
			}
		],
		ngOnInit : function()
		{
			this.model.init();
		},
		reload:function()
		{
			window.location.reload();
		}
	});	
});