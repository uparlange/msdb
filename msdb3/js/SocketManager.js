define(["app:AbstractManager"],
function (AbstractManager) 
{
	const SocketManager = function ()
	{
		AbstractManager.call(this);
		
		this._url = "http://localhost:3000";
		
		this._eventEmitters = {};
		
		this._socket = null;
	};
	
    return ng.core.Class({
		extends:AbstractManager,
        constructor: [SocketManager],
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