define(["app:AbstractClass"],
function(AbstractClass) 
{
	const AbstractPopup = function (Model, MdDialogRef)
	{
		AbstractClass.call(this);
		
		this.model = Model;
		
		this._mdDialogRef = MdDialogRef;
	};
	
	return ng.core.Class({
		extends:AbstractClass,
		constructor:AbstractPopup,
		ngOnInit : function()
		{
			if(typeof this.onInit === "function")
			{
				this.onInit();
			}
		},
		close:function()
		{
			this._mdDialogRef.close();
		}
	});			
});