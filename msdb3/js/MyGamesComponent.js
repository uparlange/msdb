define(["app:MyGamesModel", "app:AppUtils"], 
function(MyGamesModel, AppUtils) 
{
	const componentName = "mygames";
	
	return ng.core.Component({
		selector: componentName,
		templateUrl: AppUtils.getTemplateUrl(componentName),
		styleUrls: AppUtils.getStyleUrls(componentName)
	}).Class({
		constructor: [MyGamesModel,
			function (model)
			{
				this.model = model;
			}
		],
		ngOnInit : function()
		{
			this.model.init();
		},
		ngOnDestroy:function()
		{
			this.model.destroy();
		}
	});		
});