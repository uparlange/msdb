define(["app:AbstractClass"],
function (AbstractClass) 
{
	const AbstractComponent = function (element)
	{
		AbstractClass.call(this);
		
		this._element = element.nativeElement;
	};
	
	return ng.core.Class({
		extends:AbstractClass,
		constructor:AbstractComponent,
		ngOnInit : function()
		{
			if(typeof this.onInit === "function")
			{
				this.onInit(this._element);
			}
		},
		ngAfterContentInit:function()
		{
			if(typeof this.afterContentInit === "function")
			{
				this.afterContentInit(this._element);
			}
		},
		ngOnDestroy : function()
		{
			if(typeof this.onDestroy === "function")
			{
				this.onDestroy(this._element);
			}
		}
	});			
});