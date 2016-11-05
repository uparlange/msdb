define(["app:AbstractComponent", "app:ResultModel", "app:AppUtils"], 
function(AbstractComponent, ResultModel, AppUtils) 
{
	const componentName = "result";
	
	return ng.core.Component({
		selector: componentName,
		templateUrl: AppUtils.getTemplateUrl(componentName),
		styleUrls: AppUtils.getStyleUrls(componentName)
	}).Class({
		extends:AbstractComponent,
		constructor: [ResultModel, ng.router.ActivatedRoute,
			function (model, activatedRoute)
			{
				AbstractComponent.call(this, model, activatedRoute);
			}
		]
	});		
});