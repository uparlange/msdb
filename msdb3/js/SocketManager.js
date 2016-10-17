define(function () 
{
    return ng.core.Class({
        constructor: [
			function ()
			{
				this._url = "http://localhost:3000";
				
				this._socket = null;
			}
		],
		sendMessage:function (name, value)
        {
			const eventEmitter = new ng.core.EventEmitter();
			
			this._getSocket().subscribe((socket) =>
			{
				if(socket !== null)
				{
					socket.emit(name, value, function(data)
					{
						 eventEmitter.emit(data);
					});
				}
				else
				{
					eventEmitter.emit(null);
				}
			});

			return eventEmitter;
        },
		_getSocket:function()
		{
			const eventEmitter = new ng.core.EventEmitter();
			
			if(this._socket === null)
			{
				const socket = io(this._url, {
					reconnection:false
				});
				socket.on("connect", () => 
				{
					this._socket = socket;
					
					eventEmitter.emit(this._socket);
				});
				socket.on("connect_error", () => 
				{
					eventEmitter.emit(null);
				});
			}
			else
			{
				setTimeout(() =>
				{
					eventEmitter.emit(this._socket);
				},0);
			}
			
			return eventEmitter;
		}
    });
});