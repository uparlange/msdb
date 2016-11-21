define(["app:AbstractClass"],
function (AbstractClass) 
{
	const AbstractDirective = function ()
	{
		AbstractClass.call(this);
	};
	
	return ng.core.Class({
		extends:AbstractClass,
		constructor:AbstractDirective,
		ngOnChanges : function(event)
		{
			if(typeof this.onChanges === "function")
			{
				this.onChanges(event);
			}
		},
		ngOnInit : function()
		{
			if(typeof this.onInit === "function")
			{
				this.getLogger().info("onInit");
				
				this.onInit();
			}
		},
		ngDoCheck : function()
		{
			if(typeof this.onDoCheck === "function")
			{
				this.getLogger().info("onDoCheck");
				
				this.onDoCheck();
			}
		},
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