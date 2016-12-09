define(["app:AbstractModel", "app:MsdbService", "app:ConnectionManager", "app:UpdateManager", "app:RouterManager", "app:CacheManager"], 
function(AbstractModel, MsdbService, ConnectionManager, UpdateManager, RouterManager, CacheManager) 
{
	return ng.core.Class({
		extends:AbstractModel,
		constructor: [MsdbService, ConnectionManager, UpdateManager, RouterManager, CacheManager,
			function AppModel (MsdbService, ConnectionManager, UpdateManager, RouterManager, CacheManager)
			{
				AbstractModel.call(this, MsdbService, ConnectionManager);

				this._updateManager = UpdateManager;
				this._routerManager = RouterManager;
				this._cacheManager = CacheManager;
				
				this._routerManager.init();
				
				this._updateManager.init();
				
				this.data.searchLastType = this._cacheManager.getItem("searchLastType", "description");
				this._cacheManagerOnChangeSubscriber = this._cacheManager.on("change").subscribe((event) =>
				{	
					if(event.key === "searchLastType")
					{
						this.data.searchLastType = event.newValue;
					}
				});
			}
		],
		_getInitData:function()
		{
			return {
				searchLastType:null
			};
		}
	});		
});