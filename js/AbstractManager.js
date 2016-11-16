define(["app:AbstractClass"],
function (AbstractClass) 
{
	const AbstractManager = function ()
	{
		AbstractClass.call(this);
	};
	
	return ng.core.Class({
		extends:AbstractClass,
		constructor:AbstractManager
	});			
});