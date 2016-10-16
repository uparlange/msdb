define(function () 
{
    return ng.core.Class({
        constructor: [
			function ()
			{
				this._url = "http://localhost:3000";
				
				this._socket = null;
				
				this._connected = false;
			}
		],
		sendMessage: function (name, value)
        {
			const eventEmitter = new ng.core.EventEmitter();
			
			this._getSocket().subscribe(() =>
			{
				this._socket.emit(name, value, function(data)
				{
					 eventEmitter.emit(data);
				});
			});

			return eventEmitter;
        },
		_getSocket:function()
		{
			const eventEmitter = new ng.core.EventEmitter();
			
			if(!this._connected)
			{
				this._socket = io(this._url);
				this._socket.on("connect", function()
				{
					eventEmitter.emit();
				});
			}
			else
			{
				setTimeout(() =>
				{
					eventEmitter.emit();
				},0);
			}
			
			return eventEmitter;
		}
    });
});