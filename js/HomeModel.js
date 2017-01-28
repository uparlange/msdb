define(["AbstractModel", "MsdbService", "ConnectionManager", "CacheManager"], 
function(AbstractModel, MsdbService, ConnectionManager, CacheManager) 
{
	return ng.core.Class({
		extends:AbstractModel,
		constructor:[MsdbService, ConnectionManager, CacheManager,
			function HomeModel (MsdbService, ConnectionManager, CacheManager)
			{
				AbstractModel.call(this, MsdbService, ConnectionManager);
				
				this._cacheManager = CacheManager;
			}
		],
		onInit : function()
		{
			this.data.searchLastType = this._cacheManager.getItem("searchLastType", "description");
		},
		onRefresh : function()
		{
			if(this.data.mame.build === null)
			{
				this._msdbService.getMameInfos().subscribe((data) => 
				{
					if(data !== null)
					{
						data.version = data.build.substr(0, data.build.indexOf("(")).trim();
						this.data.mame = data;
					}
				});
			}
		},
		_getInitData : function()
		{
			return {
				searchLastType:null,
				mame:{
					build:null
				}
			};
		}
	});	
});