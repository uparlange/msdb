define(["AbstractComponent", "AppUtils"], 
function(AbstractComponent, AppUtils)
{
	const conf = AppUtils.getComponentConfiguration("ngForItem", {
		inputs:["last"],
		outputs:["onLast"]
	});

	return ng.core.Component(conf).Class(
	{
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