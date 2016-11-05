define(["app:AbstractPopupComponent", "app:DetailModel", "app:AppUtils"], 
function(AbstractPopupComponent, DetailModel, AppUtils) 
{
	return ng.core.Component(AppUtils.getComponentConfiguration("roms")).Class(
	{
		extends:AbstractPopupComponent,
		constructor: [DetailModel, ng.material.MdDialogRef,
			function (model, mdDialogRef)
			{
				AbstractPopupComponent.call(this, model, mdDialogRef);
			}
		]
	});	
});