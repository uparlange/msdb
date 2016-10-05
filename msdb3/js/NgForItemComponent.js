define(function() 
{
	return ng.core.Component({
		selector: "ngForItem",
		template:"<ng-content></ng-content>",
		inputs:["last"],
		outputs:["onLast"]
	}).Class({
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
				this.onLast.emit();
			}
		}
	});
});