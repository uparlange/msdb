define(["app:AbstractEventManager"], 
function (AbstractEventManager) 
{
	return ng.core.Class({
		extends:AbstractEventManager,
		constructor: [
			function ()
			{
				AbstractEventManager.call(this);
			}
		]
	});			
});