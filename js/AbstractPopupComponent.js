define(function() 
{
	return ng.core.Class({
		constructor:function (Model, MdDialogRef)
		{
			this.model = Model;
			
			this._mdDialogRef = MdDialogRef;
		},
		close:function()
		{
			this._mdDialogRef.close();
		}
	});			
});