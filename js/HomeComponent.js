define(["app:AbstractComponent", "app:HomeModel", "app:AppUtils"], 
function(AbstractComponent, HomeModel, AppUtils) 
{
	const componentName = "home";
	
	return ng.core.Component({
		selector: componentName,
		templateUrl: AppUtils.getTemplateUrl(componentName)
	}).Class({
		extends:AbstractComponent,
		constructor: [HomeModel, ng.router.ActivatedRoute,
			function (model, activatedRoute)
			{
				AbstractComponent.call(this, model, activatedRoute);
			}
		]
	});	
});