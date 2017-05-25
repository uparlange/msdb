define(["AbstractPopup", "DetailModel", "AppUtils"], 
function(AbstractPopup, DetailModel, AppUtils) 
{
	const conf = AppUtils.getComponentConfiguration("ports");

	return ng.core.Component(conf).Class(
	{
		extends:AbstractPopup,
		constructor: [DetailModel, ng.material.material.MdDialogRef, 
			function PortsPopup (DetailModel, MdDialogRef)
			{
				AbstractPopup.call(this, DetailModel, MdDialogRef);
			}
		],
		getPortValue:function(value)
		{
			return value.replace(/:/g, " > ");
		}
	});	
});