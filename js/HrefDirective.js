define(["AbstractDirective", "RouterManager", "AppUtils"], 
function(AbstractDirective, RouterManager, AppUtils) 
{
	const conf = AppUtils.getDirectiveConfiguration("[href]", {
		host: {
			"(click)":"onClick($event)"
		}
	});

	return ng.core.Directive(conf).Class(
	{
		extends:AbstractDirective,
		constructor: [RouterManager,
			function HrefDirective (RouterManager)
			{
				AbstractDirective.call(this);
				
				this._routerManager = RouterManager;
			}
		],
		onClick:function() 
		{
			this._routerManager.saveCurrentViewScrollPosition();
		}
	});
});