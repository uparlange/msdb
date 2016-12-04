define(["app:AbstractPopup", "app:DetailModel", "app:AppUtils"], 
function(AbstractPopup, DetailModel, AppUtils) 
{
	return ng.core.Component(AppUtils.getComponentConfiguration("roms")).Class(
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