define(["app:MyGamesProvider", "app:AppUtils"], 
function(MyGamesProvider, AppUtils) 
{
	const componentName = "mygames";
	
	return ng.core.Component({
		selector: componentName,
		templateUrl: AppUtils.getTemplateUrl(componentName),
		styleUrls: AppUtils.getStyleUrls(componentName)
	}).Class({
		constructor: [MyGamesProvider,
			function (model)
			{
				this.model = model;
			}
		],
		ngOnInit : function()
		{
			this.model.init();
		}
	});		
});