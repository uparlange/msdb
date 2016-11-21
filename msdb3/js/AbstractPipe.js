define(["app:AbstractClass"],
function (AbstractClass) 
{
	const AbstractPipe = function ()
	{
		AbstractClass.call(this);
	};
	
	return ng.core.Class({
		extends:AbstractClass,
		constructor:AbstractPipe,
		ngOnDestroy : function()
		{
			if(typeof this.onDestroy === "function")
			{
				this.getLogger().info("onDestroy");
				
				this.onDestroy();
			}
			else
			{
				this.getLogger().warn("onDestroy?");
			}
		}
	});			
});