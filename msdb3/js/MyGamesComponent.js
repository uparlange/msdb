define(["app:AbstractComponent", "app:MyGamesModel", "app:AppUtils"], 
function(AbstractComponent, MyGamesModel, AppUtils) 
{
	const componentName = "mygames";
	
	return ng.core.Component({
		selector: componentName,
		templateUrl: AppUtils.getTemplateUrl(componentName),
		styleUrls: AppUtils.getStyleUrls(componentName)
	}).Class({
		extends:AbstractComponent,
		constructor: [MyGamesModel, ng.router.ActivatedRoute,
			function (model, activatedRoute)
			{
				AbstractComponent.call(this, model, activatedRoute);
			}
		]
	});		
});