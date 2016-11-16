define(["app:AbstractClass"],
function (AbstractClass) 
{
	const AbstractModule = function ()
	{
		AbstractClass.call(this);
	};
	
	return ng.core.Class({
		extends:AbstractClass,
		constructor:AbstractModule
	});			
});