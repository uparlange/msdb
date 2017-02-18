define(["AbstractDirective", "AppUtils"],
function(AbstractDirective, AppUtils)
{
	const conf = AppUtils.getDirectiveConfiguration("video", {
		inputs:["source"],
		outputs:["onEvent"],
		host:{
			"[attr.src]":"src",
			"(error)":"onError($event)",
			"(loadedmetadata)":"onLoadedmetadata($event)"
		}
	});

	return ng.core.Directive(conf).Class(
	{
		extends:AbstractDirective,
		constructor: [
			function VideoDirective ()
			{
				AbstractDirective.call(this);
				
				this.onEvent = new ng.core.EventEmitter();

				this.src = "";
			}
		],
		onError:function(event)
		{
			this.onEvent.emit(event);
		},
		onLoadedmetadata:function(event)
		{
			this.onEvent.emit(event);
		},
		onChanges: function (event)
		{
			if(event.hasOwnProperty("source"))
			{
				if(typeof event.source.currentValue === "string")
				{
					this.src = event.source.currentValue;
				}
			}
		}
	});
});