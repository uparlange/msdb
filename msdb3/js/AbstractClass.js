define(["app:LogManager"],
function (LogManager) 
{
	const AbstractClass = function ()
	{
		this.getLogger().debug("constructor");
	};
	
	return ng.core.Class({
		constructor:AbstractClass,
		getLogger:function()
		{
			return LogManager.getLogger(this.constructor.name);
		},
		getEncodedValue:function(value)
		{
			return encodeURIComponent(value);
		},
		getDecodedValue:function(value)
		{
			return decodeURIComponent(value);
		},
	});			
});