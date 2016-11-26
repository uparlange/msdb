define(["app:LogUtils"],
function (LogUtils) 
{
	const AbstractClass = function ()
	{
		this._logger = LogUtils.getLogger(this.constructor.name);
		
		this.getLogger().debug("constructor");
	};
	
	return ng.core.Class({
		constructor:AbstractClass,
		getLogger:function()
		{
			return this._logger;
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