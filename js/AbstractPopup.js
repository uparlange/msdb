define(["app:AbstractComponent"],
function(AbstractComponent) 
{
	const AbstractPopup = function (Model, MdDialogRef)
	{
		AbstractComponent.call(this);
		
		this.model = Model;
		
		this._mdDialogRef = MdDialogRef;
	};
	
	return ng.core.Class({
		extends:AbstractComponent,
		constructor:AbstractPopup,
		close:function()
		{
			this._mdDialogRef.close();
		}
	});			
});