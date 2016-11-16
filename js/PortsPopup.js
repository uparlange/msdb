define(["app:AbstractPopup", "app:DetailModel", "app:AppUtils"], 
function(AbstractPopup, DetailModel, AppUtils) 
{
	const PortsPopup = function (DetailModel, MdDialogRef)
	{
		AbstractPopup.call(this, DetailModel, MdDialogRef);
	};
	
	return ng.core.Component(AppUtils.getComponentConfiguration("ports")).Class(
	{
		extends:AbstractPopup,
		constructor: [DetailModel, ng.material.MdDialogRef, PortsPopup],
		getPortValue:function(value)
		{
			return value.replace(/:/g, " > ");
		}
	});	
});