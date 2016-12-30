define(["app:AbstractManager", "app:AppUtils"],
function (AbstractManager, AppUtils) 
{
	return ng.core.Class({
		extends:AbstractManager,
        constructor: [
			function SocketManager ()
			{
				AbstractManager.call(this);
				
				this._url = AppUtils.getSocketUrl();
				
				this._eventEmitters = {};
				
				this._socket = null;
			}
		],
		on:function(eventName)
		{
			let eventEmitter = this._eventEmitters[eventName];
			if(eventEmitter === undefined)
			{
				eventEmitter = new ng.core.EventEmitter();
				this._eventEmitters[eventName] = eventEmitter;
			}
			
			this._getSocket().subscribe((socket) =>
			{
				if(socket !== null)
				{
					socket.on(eventName, () =>
					{
						eventEmitter.emit();
					});
				}
			});
			
			return eventEmitter;
		},
		off:function(eventSubscriber)
		{
			eventSubscriber.unsubscribe();
		},
		emit:function (eventName, value)
        {
			const eventEmitter = new ng.core.EventEmitter();
			
			this._getSocket().subscribe((socket) =>
			{
				if(socket !== null)
				{
					socket.emit(eventName, value, (data) =>
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
				this._socket = io(this._url, {
					reconnection:false
				});
				this._socket.on("connect", () => 
				{
					eventEmitter.emit(this._socket);
				});
				this._socket.on("connect_error", () => 
				{
					this._socket = null;
					
					eventEmitter.emit(this._socket);
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