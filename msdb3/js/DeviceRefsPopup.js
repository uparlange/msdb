define(["app:AbstractPopup", "app:DetailModel", "app:AppUtils"], 
function(AbstractPopup, DetailModel, AppUtils) 
{
	return ng.core.Component(AppUtils.getComponentConfiguration("deviceRefs")).Class(
	{
		extends:AbstractPopup,
		constructor: [DetailModel, ng.material.MdDialogRef, 
			function DeviceRefsPopup (DetailModel, MdDialogRef)
			{
				AbstractPopup.call(this, DetailModel, MdDialogRef);
			}
		]
	});	
});