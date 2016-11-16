define(function () 
{
	const AbstractClass = function ()
	{
		console.log(this.getClassName(), "constructor");
	};
	
	return ng.core.Class({
		constructor:AbstractClass,
		getClassName:function()
		{
			return this.constructor.name;
		}
	});			
});