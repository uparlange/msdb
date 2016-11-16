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
			let className = "";
			try 
			{
				className = this.constructor.name;
			}
			catch(e)
			{
				// Tant pis :-(
			}
			
			return className;
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