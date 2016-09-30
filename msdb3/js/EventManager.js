define(function () 
{
	return ng.core.Class({
		constructor: [
			function ()
			{
				this._eventEmitters = {};
			}
		],
		on : function(name)
		{
			const eventEmitters = this._getEventEmitters(name);
			const eventEmitter = new ng.core.EventEmitter();
			eventEmitters.push(eventEmitter);
			return eventEmitter;
		},
		emit : function(name, evt)
		{
			const eventEmitters = this._getEventEmitters(name);
			eventEmitters.forEach((element, index, array) =>
			{
				element.emit(evt);
			});
		},
		off : function(eventEmitter)
		{
			for(const name in this._eventEmitters)
			{
				const eventEmitters = this._getEventEmitters(name);
				eventEmitters.forEach((element, index, array) =>
				{
					if(element === eventEmitter)
					{
						eventEmitters.splice(index, 1);
						return;
					}
				});
			}
			eventEmitter.unsubscribe();
			return eventEmitter;
		},
		_getEventEmitters : function(name)
		{
			if(this._eventEmitters[name] === undefined)
			{
				this._eventEmitters[name] = [];
			}
			
			return this._eventEmitters[name];
		}
	});			
});