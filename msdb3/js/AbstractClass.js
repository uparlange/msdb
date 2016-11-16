define(function () 
{
	const AbstractClass = function ()
	{
		this.getLogger().info("constructor");
	};
	
	return ng.core.Class({
		constructor:AbstractClass,
		getClassName:function()
		{
			return this.constructor.name;
		},
		getLogger:function()
		{
			const that = this;
			return {
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