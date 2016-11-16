define(["app:AbstractPopupComponent", "app:DetailModel", "app:AppUtils"], 
function(AbstractPopupComponent, DetailModel, AppUtils) 
{
	const ClonesComponent = function (DetailModel, MdDialogRef)
	{
		AbstractPopupComponent.call(this, DetailModel, MdDialogRef);
	};
	
	return ng.core.Component(AppUtils.getComponentConfiguration("clones")).Class(
	{
		extends:AbstractPopupComponent,
		constructor: [DetailModel, ng.material.MdDialogRef, ClonesComponent]
	});	
});