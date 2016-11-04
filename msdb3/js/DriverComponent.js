define(["app:AppUtils", "app:DetailModel"], 
function(AppUtils, DetailModel) 
{
	const componentName = "driver";
	
	return ng.core.Component({
		selector: componentName,
		templateUrl: AppUtils.getTemplateUrl(componentName)
	}).Class({
		constructor: [DetailModel, ng.material.MdDialogRef,
			function (model, mdDialogRef)
			{
				this._mdDialogRef = mdDialogRef;
				
				this.model = model;
			}
		],
		close:function()
		{
			this._mdDialogRef.close();
		}
	});	
});