define(["AbstractComponent", "AppUtils"], 
function(AbstractComponent, AppUtils)
{
	return ng.core.Component(AppUtils.getComponentConfiguration("ngForItem", {
		inputs:["last"],
		outputs:["onLast"]
	})).Class({
		extends:AbstractComponent,
		constructor: [
			function NgForItemComponent ()
			{
				AbstractComponent.call(this);
				
				this.onLast = new ng.core.EventEmitter();
				
				this.last = false;
			}
		],
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