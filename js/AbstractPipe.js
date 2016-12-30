define(["app:AbstractClass"],
function (AbstractClass) 
{
	return ng.core.Class({
		extends:AbstractClass,
		constructor:function AbstractPipe ()
		{
			AbstractClass.call(this);
		},
		ngOnDestroy : function()
		{
			if(typeof this.onDestroy === "function")
			{
				this.getLogger().debug("onDestroy");
				
				this.onDestroy();
			}
			else
			{
				this.getLogger().warn("onDestroy?");
			}
		}
	});			
});