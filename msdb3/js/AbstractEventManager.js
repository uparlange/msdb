define(["app:AbstractManager"],
function (AbstractManager) 
{
	const AbstractEventManager = function ()
	{
		AbstractManager.call(this);
		
		this._eventEmitters = {};
	};
	
	return ng.core.Class({
		extends:AbstractManager,
		constructor:AbstractEventManager,
		on : function(eventName)
		{
			let eventEmitter = this._eventEmitters[eventName];
			if(eventEmitter === undefined)
			{
				eventEmitter = new ng.core.EventEmitter();
				this._eventEmitters[eventName] = eventEmitter;
			}
			return eventEmitter;
		},
		emit : function(eventName, evt)
		{
			const eventEmitter = this._eventEmitters[eventName];
			if(eventEmitter !== undefined)
			{
				eventEmitter.emit(evt);
			}
		},
		off : function(eventSubscriber)
		{
			eventSubscriber.unsubscribe();
		}
	});			
});