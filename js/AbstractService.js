define(["app:AbstractClass"],
function (AbstractClass) 
{
	const AbstractService = function ()
	{
		AbstractClass.call(this);
	};
	
	return ng.core.Class({
		extends:AbstractClass,
		constructor:AbstractService
	});			
});