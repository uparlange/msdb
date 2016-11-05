define(function() 
{
	return ng.core.Class({
		constructor:function (model, mdDialogRef)
		{
			this.model = model;
			
			this._mdDialogRef = mdDialogRef;
		},
		close:function()
		{
			this._mdDialogRef.close();
		}
	});			
});