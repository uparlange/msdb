define(["LogUtils"],
function (LogUtils) 
{
	return ng.core.Class({
		constructor:function AbstractClass ()
		{
			this._logger = LogUtils.getLogger(this.constructor.name);
			
			this.getLogger().debug("constructor");
		},
		getLogger:function()
		{
			return this._logger;
		}
	});			
});