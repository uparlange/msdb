define(["app:EventManager"], 
function (EventManager) 
{
    return ng.core.Class({
		extends:EventManager,
        constructor: [
			function ()
			{
				EventManager.call(this);
				
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