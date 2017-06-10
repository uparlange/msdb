define(["AbstractPopup", "DetailModel", "AppUtils"], 
function(AbstractPopup, DetailModel, AppUtils) 
{
	const conf = AppUtils.getComponentConfiguration("roms");

	return ng.core.Component(conf).Class(
	{
		extends:AbstractPopup,
		constructor: [DetailModel, ng.material.MdDialogRef, 
			function RomsPopup (DetailModel, MdDialogRef)
			{
				AbstractPopup.call(this, DetailModel, MdDialogRef);
			}
		]
	});	
});