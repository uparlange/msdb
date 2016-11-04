define(["app:AppModel", "app:AppUtils"], 
function(AppModel, AppUtils) 
{
	const componentName = "app";
	
	return ng.core.Component({
		selector: componentName,
		templateUrl: AppUtils.getTemplateUrl(componentName),
		styleUrls: AppUtils.getStyleUrls(componentName)
	}).Class({
		constructor: [AppModel,
			function (model)
			{
				this.model = model;
			}
		],
		ngOnInit:function()
		{
			this.model.init();
		},
		ngOnDestroy:function()
		{
			this.model.destroy();
		},
		toggleLanguage:function()
		{
			this.model.toggleLanguage();
		}
	});
});