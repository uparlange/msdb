define(["app:AppUtils", "app:DetailProvider"], 
function(AppUtils, DetailProvider) 
{
	const componentName = "clones";
	
	return ng.core.Component({
		selector: componentName,
		templateUrl: AppUtils.getTemplateUrl(componentName)
	}).Class({
		constructor: [DetailProvider, ng.material.MdDialogRef,
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