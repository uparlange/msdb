define(["app:AbstractComponent", "app:AppUtils"], 
function(AbstractComponent, AppUtils)
{
	const NgForItemComponent = function ()
	{
		AbstractComponent.call(this);
		
		this.onLast = new ng.core.EventEmitter();
		
		this.last = false;
	};
	
	return ng.core.Component(AppUtils.getComponentConfiguration("ngForItem", {
		inputs:["last"],
		outputs:["onLast"]
	})).Class({
		extends:AbstractComponent,
		constructor: [NgForItemComponent],
		afterContentInit:function()
		{
			if(this.last)
			{
				setTimeout(() =>
				{
					this.onLast.emit();
				},0);
			}
		}
	});
});