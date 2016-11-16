define(["app:AbstractComponent", "app:AppUtils"], 
function(AbstractComponent, AppUtils)
{
	const NgForItemComponent = function (element)
	{
		AbstractComponent.call(this, element);
		
		this.onLast = new ng.core.EventEmitter();
		
		this.last = false;
	};
	
	return ng.core.Component(AppUtils.getComponentConfiguration("ngForItem", {
		inputs:["last"],
		outputs:["onLast"]
	})).Class({
		extends:AbstractComponent,
		constructor: [ng.core.ElementRef, NgForItemComponent],
		afterContentInit:function(element)
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