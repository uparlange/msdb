define(["app:AbstractClass"],
function (AbstractClass) 
{
	return ng.core.Class({
		extends:AbstractClass,
		constructor:function AbstractDirective ()
		{
			AbstractClass.call(this);
		},
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
			if(typeof this.doCheck === "function")
			{
				this.getLogger().info("doCheck");
				
				this.doCheck();
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