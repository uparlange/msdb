define(function () 
{
	const AbstractClass = function ()
	{
		console.log(this.constructor.name, "constructor");
	};
	
	return ng.core.Class({
		constructor:AbstractClass
	});			
});