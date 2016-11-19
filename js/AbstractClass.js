define(function () 
{
	const AbstractClass = function ()
	{
		this.getLogger().debug("constructor");
		
		this._md = new MobileDetect(window.navigator.userAgent);
	};
	
	return ng.core.Class({
		constructor:AbstractClass,
		getClassName:function()
		{
			return this.constructor.name;
		},
		getDevice:function()
		{
			return this._md;
		},
		getLogger:function()
		{
			const that = this;
			return {
				debug:function(message)
				{
					console.debug(that.getClassName(), message);
				},
				info:function(message)
				{
					console.info(that.getClassName(), message);
				},
				warn:function(message)
				{
					console.warn(that.getClassName(), message);
				}
			};
		}
	});			
});