define(["app:AbstractPopupComponent", "app:DetailModel", "app:AppUtils"], 
function(AbstractPopupComponent, DetailModel, AppUtils) 
{
	return ng.core.Component(AppUtils.getComponentConfiguration("driver")).Class(
	{
		extends:AbstractPopupComponent,
		constructor: [DetailModel, ng.material.MdDialogRef,
			function (DetailModel, MdDialogRef)
			{
				AbstractPopupComponent.call(this, DetailModel, MdDialogRef);
			}
		]
	});	
});