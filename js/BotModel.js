define(["app:AbstractModel", "app:MsdbService", "app:ConnectionManager"], 
function(AbstractModel, MsdbService, ConnectionManager) 
{
	return ng.core.Class({
		extends:AbstractModel,
		constructor:[MsdbService, ConnectionManager,
			function BotModel (MsdbService, ConnectionManager)
			{
				AbstractModel.call(this, MsdbService, ConnectionManager);
			}
		],
		_getInitData : function()
		{
			return {
				
			};
		}
	});	
});