define(["app:AbstractComponent", "app:SearchModel", "app:AppUtils"], 
function(AbstractComponent, SearchModel, AppUtils) 
{
	const componentName = "search";
	
	return ng.core.Component({
		selector: componentName,
		templateUrl: AppUtils.getTemplateUrl(componentName),
		styleUrls: AppUtils.getStyleUrls(componentName)
	}).Class({
		extends:AbstractComponent,
		constructor: [SearchModel, ng.router.ActivatedRoute,
			function (model, activatedRoute)
			{
				AbstractComponent.call(this, model, activatedRoute);
			}
		]
	});
});