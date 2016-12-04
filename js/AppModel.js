define(["app:AbstractModel", "app:MsdbService", "app:ConnectionManager", "app:AppUtils", "app:UpdateManager",
		"app:CacheManager"], 
function(AbstractModel, MsdbService, ConnectionManager, AppUtils, UpdateManager,
		 CacheManager) 
{
	return ng.core.Class({
		extends:AbstractModel,
		constructor: [MsdbService, ConnectionManager, ng.router.Router, CacheManager, UpdateManager, ng.common.Location,
			function AppModel (MsdbService, ConnectionManager, Router, CacheManager, UpdateManager,location)
			{
				AbstractModel.call(this, MsdbService, ConnectionManager);
				
				this._router = Router;
				this._cacheManager = CacheManager;
				this._updateManager = UpdateManager;
				this._location = location;
				
				this._routerEventsSubscriber = this._router.events.subscribe((e) =>
				{
					switch(e.constructor.name)
					{
						case "NavigationStart" :
							if(e.id === 1)
							{
								if(AppUtils.getDevice().mobile() !== null)
								{
									const lastView = this._cacheManager.getItem("lastView", "/home");
									this._router.navigateByUrl(lastView);
								}
							}
							else
							{
								const scrollTop = document.querySelector("body").scrollTop;
								const currentPath = this._location.path(true);
								this._cacheManager.setItem("scrollTop_" + currentPath, scrollTop);
							}
							break;
						case "NavigationEnd" :
							this._cacheManager.setItem("lastView", e.urlAfterRedirects);
							break;
					}
				});
				
				this._updateManager.check();
			}
		],
		_getInitData:function()
		{
			return null;
		}
	});		
});