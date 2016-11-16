define(["app:AbstractClass"],
function (AbstractClass) 
{
	const AbstractPipe = function ()
	{
		AbstractClass.call(this);
	};
	
	return ng.core.Class({
		extends:AbstractClass,
		constructor:AbstractPipe
	});			
});