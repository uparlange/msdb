define(["app:AbstractPopupComponent", "app:DetailModel", "app:AppUtils"], 
function(AbstractPopupComponent, DetailModel, AppUtils) 
{
	const componentName = "roms";
	
	return ng.core.Component({
		selector: componentName,
		templateUrl: AppUtils.getTemplateUrl(componentName)
	}).Class({
		extends:AbstractPopupComponent,
		constructor: [DetailModel, ng.material.MdDialogRef,
			function (model, mdDialogRef)
			{
				AbstractPopupComponent.call(this, model, mdDialogRef);
			}
		]
	});	
});