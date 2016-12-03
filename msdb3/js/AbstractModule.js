define(["app:AbstractClass"],
function (AbstractClass) 
{
	return ng.core.Class({
		extends:AbstractClass,
		constructor:function AbstractModule ()
		{
			AbstractClass.call(this);
		}
	});			
});