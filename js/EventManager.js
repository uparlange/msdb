define(function () 
{
	return ng.core.Class({
		constructor: [
			function ()
			{
				this._eventEmitters = {};
			}
		],
		on : function(name, eventEmitter)
		{
			const eventEmitters = this._getEventEmitters(name);
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
		off : function(name, eventEmitter)
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