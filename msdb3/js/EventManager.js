define(["app:AbstractEventManager"], 
function (AbstractEventManager) 
{
	const EventManager = function ()
	{
		AbstractEventManager.call(this);
	};
	
	return ng.core.Class({
		extends:AbstractEventManager,
		constructor:[EventManager]
	});			
});