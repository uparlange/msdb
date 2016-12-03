define(["app:AbstractDirective"],
function (AbstractDirective) 
{
	return ng.core.Class({
		extends:AbstractDirective,
		constructor:function AbstractComponent ()
		{
			AbstractDirective.call(this);
		},
		ngAfterContentInit:function()
		{
			if(typeof this.afterContentInit === "function")
			{
				this.getLogger().info("afterContentInit");
				
				this.afterContentInit();
			}
		},
		ngAfterContentChecked:function()
		{
			if(typeof this.afterContentChecked === "function")
			{
				this.getLogger().info("afterContentChecked");
				
				this.afterContentChecked();
			}
		},
		ngAfterViewInit:function()
		{
			if(typeof this.afterViewInit === "function")
			{
				this.getLogger().info("afterViewInit");
				
				this.afterViewInit();
			}
		},
		ngAfterViewChecked:function()
		{
			if(typeof this.afterViewChecked === "function")
			{
				this.getLogger().info("afterViewChecked");
				
				this.afterViewChecked();
			}
		}
	});			
});