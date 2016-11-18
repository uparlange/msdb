define(["app:AbstractClass"],
function (AbstractClass) 
{
	const AbstractDirective = function (element)
	{
		AbstractClass.call(this);
		
		this._element = element.nativeElement;
	};
	
	return ng.core.Class({
		extends:AbstractClass,
		constructor:AbstractDirective,
		ngOnInit : function()
		{
			if(typeof this.onInit === "function")
			{
				this.getLogger().info("onInit");
				
				this.onInit(this._element);
			}
		},
		ngOnChanges : function(event)
		{
			if(typeof this.onChanges === "function")
			{
				this.onChanges(this._element, event);
			}
		},
		ngOnDestroy : function()
		{
			if(typeof this.onDestroy === "function")
			{
				this.onDestroy(this._element);
			}
			else
			{
				this.getLogger().warn("onDestroy?");
			}
		}
	});			
});