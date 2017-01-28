define(["AbstractEventManager"], 
function (AbstractEventManager) 
{
	return ng.core.Class({
		extends:AbstractEventManager,
		constructor:[
			function EventManager ()
			{
				AbstractEventManager.call(this);
			}
		]
	});			
});