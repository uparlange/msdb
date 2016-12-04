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
		ngOnDestroy:function()
		{
			AbstractComponent.prototype.ngOnDestroy.call(this);
			
			this.model = null;
			
			this._mdDialogRef = null;
		},
		close:function()
		{
			this._mdDialogRef.close();
		}
	});			
});