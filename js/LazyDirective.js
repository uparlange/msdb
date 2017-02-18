define(["AbstractDirective", "LazyManager", "AppUtils"], 
function(AbstractDirective, LazyManager, AppUtils) 
{
	const conf = AppUtils.getDirectiveConfiguration("[lazySrc]", {
		inputs: ["lazySrc"],
		host:{
			"[class.b-lazy]":"true",
			"[attr.src]":"src",
			"[attr.data-src]":"dataSrc"
		}
	});

	return ng.core.Directive(conf).Class(
	{
		extends:AbstractDirective,
		constructor: [LazyManager, 
			function LazyDirective (LazyManager)
			{
				AbstractDirective.call(this);
				
				this._lazyManager = LazyManager;

				this.dataSrc = null;

				this.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
			}
		],
		onChanges: function (event)
		{
			if(event.hasOwnProperty("lazySrc"))
			{
				if(typeof event.lazySrc.currentValue === "string")
				{
					this.dataSrc = event.lazySrc.currentValue;

					this._lazyManager.refresh();
				}
			}
		}
	});
});