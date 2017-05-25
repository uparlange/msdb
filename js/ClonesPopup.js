define(["AbstractPopup", "DetailModel", "AppUtils"], 
function(AbstractPopup, DetailModel, AppUtils) 
{
	const conf = AppUtils.getComponentConfiguration("clones");

	return ng.core.Component(conf).Class(
	{
		extends:AbstractPopup,
		constructor: [DetailModel, ng.material.material.MdDialogRef, 
			function ClonesPopup (DetailModel, MdDialogRef)
			{
				AbstractPopup.call(this, DetailModel, MdDialogRef);
			}
		]
	});	
});