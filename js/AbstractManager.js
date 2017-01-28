define(["AbstractClass"],
function (AbstractClass) 
{
	return ng.core.Class({
		extends:AbstractClass,
		constructor:function AbstractManager ()
		{
			AbstractClass.call(this);
		}
	});			
});