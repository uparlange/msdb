define(["app:AbstractClass"],
function(AbstractClass) 
{
	const AbstractPopupComponent = function (Model, MdDialogRef)
	{
		AbstractClass.call(this);
		
		this.model = Model;
		
		this._mdDialogRef = MdDialogRef;
	};
	
	return ng.core.Class({
		extends:AbstractClass,
		constructor:AbstractPopupComponent,
		close:function()
		{
			this._mdDialogRef.close();
		}
	});			
});