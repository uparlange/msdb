define(["AbstractModel", "MsdbService", "ConnectionManager"], 
function(AbstractModel, MsdbService, ConnectionManager) 
{
	return ng.core.Class({
		extends:AbstractModel,
		constructor:[MsdbService, ConnectionManager, ng.platformBrowser.Title,
			function BotModel (MsdbService, ConnectionManager, Title)
			{
				AbstractModel.call(this, MsdbService, ConnectionManager, Title);
			}
		],
		_getInitData : function()
		{
			return {
				
			};
		}
	});	
});