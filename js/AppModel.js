define(["app:AbstractModel", "app:MsdbService", "app:ConnectionManager", "app:UpdateManager", "app:RouterManager"], 
function(AbstractModel, MsdbService, ConnectionManager, UpdateManager, RouterManager) 
{
	return ng.core.Class({
		extends:AbstractModel,
		constructor: [MsdbService, ConnectionManager, UpdateManager, RouterManager,
			function AppModel (MsdbService, ConnectionManager, UpdateManager, RouterManager)
			{
				AbstractModel.call(this, MsdbService, ConnectionManager);

				this._updateManager = UpdateManager;
				this._routerManager = RouterManager;
				
				this._routerManager.init();
				
				this._updateManager.init();
			}
		],
		_getInitData:function()
		{
			return null;
		}
	});		
});