define(["app:AppUtils"], 
function(AppUtils)
{
	return ng.core.Component(AppUtils.getComponentConfiguration("ngForItem", {
		inputs:["last"],
		outputs:["onLast"]
	})).Class({
		constructor: [ng.core.ElementRef,
			function (element)
			{
				this.onLast = new ng.core.EventEmitter();
				
				this.last = false;
			}
		],
		ngAfterContentInit:function()
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