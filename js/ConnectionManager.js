define(["app:AbstractEventManager"], 
function (AbstractEventManager) 
{
    return ng.core.Class({
		extends:AbstractEventManager,
        constructor: [
			function ()
			{
				AbstractEventManager.call(this);
				
				this.online = window.navigator.onLine;
				
				window.addEventListener("offline", (e) => 
				{ 
					this._changeHandler();
				});
				window.addEventListener("online", (e) => 
				{ 
					this._changeHandler();
				});
			}
		],
		_changeHandler:function()
		{
			this.online = window.navigator.onLine;
			this.emit("change", this.online);
		}
	});	
});