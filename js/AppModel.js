define(["AbstractModel", "MsdbService", "ConnectionManager", "CacheManager"], 
function(AbstractModel, MsdbService, ConnectionManager, CacheManager) 
{
	return ng.core.Class({
		extends:AbstractModel,
		constructor: [MsdbService, ConnectionManager, CacheManager,
			function AppModel (MsdbService, ConnectionManager, CacheManager)
			{
				AbstractModel.call(this, MsdbService, ConnectionManager);

				this._cacheManager = CacheManager;
				
				this._initCache();
			}
		],
		_initCache:function()
		{
			this.data.searchLastType = this._cacheManager.getItem("searchLastType", "description");
			this._cacheManagerOnChangeSubscriber = this._cacheManager.on("change").subscribe((event) =>
			{	
				if(event.key === "searchLastType")
				{
					this.data.searchLastType = event.newValue;
				}
			});
		},
		_getInitData:function()
		{
			return {
				searchLastType:null
			};
		}
	});		
});