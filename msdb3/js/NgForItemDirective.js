define(function() 
{
	return ng.core.Directive({
		selector: "ngForItem",
		inputs:["last"],
		outputs:["complete"]
	}).Class({
		constructor: [ng.core.ElementRef,
			function (element)
			{
				this.complete = new ng.core.EventEmitter();
				
				this.last = false;
			}
		],
		ngOnInit:function()
		{
			if(this.last)
			{
				setTimeout(() =>
				{
					this.complete.emit();
				});
			}
		}
	});
});