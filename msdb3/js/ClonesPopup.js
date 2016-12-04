define(["app:AbstractPopup", "app:DetailModel", "app:AppUtils"], 
function(AbstractPopup, DetailModel, AppUtils) 
{
	return ng.core.Component(AppUtils.getComponentConfiguration("clones")).Class(
	{
		extends:AbstractPopup,
		constructor: [DetailModel, ng.material.MdDialogRef, 
			function ClonesPopup (DetailModel, MdDialogRef)
			{
				AbstractPopup.call(this, DetailModel, MdDialogRef);
			}
		]
	});	
});