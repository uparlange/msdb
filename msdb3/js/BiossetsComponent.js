define(["app:AbstractPopupComponent", "app:DetailModel", "app:AppUtils"], 
function(AbstractPopupComponent, DetailModel, AppUtils) 
{
	const BiossetsComponent = function (DetailModel, MdDialogRef)
	{
		AbstractPopupComponent.call(this, DetailModel, MdDialogRef);
	};
	
	return ng.core.Component(AppUtils.getComponentConfiguration("biossets")).Class(
	{
		extends:AbstractPopupComponent,
		constructor: [DetailModel, ng.material.MdDialogRef, BiossetsComponent]
	});	
});