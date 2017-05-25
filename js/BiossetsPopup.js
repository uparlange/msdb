define(["AbstractPopup", "DetailModel", "AppUtils"], 
function(AbstractPopup, DetailModel, AppUtils) 
{
	const conf = AppUtils.getComponentConfiguration("biossets");

	return ng.core.Component(conf).Class(
	{
		extends:AbstractPopup,
		constructor: [DetailModel, ng.material.material.MdDialogRef, 
			function BiossetsPopup (DetailModel, MdDialogRef)
			{
				AbstractPopup.call(this, DetailModel, MdDialogRef);
			}
		]
	});	
});