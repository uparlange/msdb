define(["app:AbstractComponent"],
function(AbstractComponent) 
{
	return ng.core.Class({
		extends:AbstractComponent,
		constructor:function AbstractPopup (Model, MdDialogRef)
		{
			AbstractComponent.call(this);
			
			this.model = Model;
			
			this._mdDialogRef = MdDialogRef;
		},
		close:function()
		{
			this._mdDialogRef.close();
		}
	});			
});