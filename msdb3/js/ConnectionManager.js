define(["app:AbstractEventManager"], 
function (AbstractEventManager) 
{
	const ConnectionManager = function ()
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
	};
	
    return ng.core.Class({
		extends:AbstractEventManager,
        constructor: [ConnectionManager],
		_changeHandler:function()
		{
			this.online = window.navigator.onLine;
			this.emit("change", this.online);
		}
	});	
});