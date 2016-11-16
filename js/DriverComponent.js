define(["app:AbstractPopupComponent", "app:DetailModel", "app:AppUtils"], 
function(AbstractPopupComponent, DetailModel, AppUtils) 
{
	const DriverComponent = function (DetailModel, MdDialogRef)
	{
		AbstractPopupComponent.call(this, DetailModel, MdDialogRef);
	};
	
	return ng.core.Component(AppUtils.getComponentConfiguration("driver")).Class(
	{
		extends:AbstractPopupComponent,
		constructor: [DetailModel, ng.material.MdDialogRef, DriverComponent]
	});	
});