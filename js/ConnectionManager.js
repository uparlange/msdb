define(["app:AbstractEventManager", "app:WindowRef"], 
function (AbstractEventManager, WindowRef) 
{
	return ng.core.Class({
		extends:AbstractEventManager,
        constructor: [WindowRef,
			function ConnectionManager (WindowRef)
			{
				AbstractEventManager.call(this);

				this._window = WindowRef.nativeWindow;
				
				this.online = this._window.navigator.onLine;
				
				this._window.addEventListener("offline", () => 
				{ 
					this._changeHandler();
				});
				this._window.addEventListener("online", () => 
				{ 
					this._changeHandler();
				});
			}
		],
		_changeHandler:function()
		{
			this.online = this._window.navigator.onLine;
			this.emit("change", this.online);
		}
	});	
});