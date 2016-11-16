define(["app:AbstractPopupComponent", "app:DetailModel", "app:AppUtils"], 
function(AbstractPopupComponent, DetailModel, AppUtils) 
{
	const PortsComponent = function (DetailModel, MdDialogRef)
	{
		AbstractPopupComponent.call(this, DetailModel, MdDialogRef);
	};
	
	return ng.core.Component(AppUtils.getComponentConfiguration("ports")).Class(
	{
		extends:AbstractPopupComponent,
		constructor: [DetailModel, ng.material.MdDialogRef, PortsComponent],
		getPortValue:function(value)
		{
			return value.replace(/:/g, " > ");
		}
	});	
});