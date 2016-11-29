define(["app:AbstractModel", "app:MsdbService", "app:ConnectionManager", "app:AppUtils", "app:UpdateManager",
		"app:CacheManager"], 
function(AbstractModel, MsdbService, ConnectionManager, AppUtils, UpdateManager,
		 CacheManager) 
{
	const AppModel = function (MsdbService, ConnectionManager, Router, CacheManager, UpdateManager)
	{
		AbstractModel.call(this, MsdbService, ConnectionManager);
		
		this._router = Router;
		this._cacheManager = CacheManager;
		this._updateManager = UpdateManager;
		
		this._routerEventsSubscriber = this._router.events.subscribe((e) =>
		{
			switch(e.constructor.name)
			{
				case "NavigationStart" :
					if(AppUtils.getDevice().mobile() !== null && e.id === 1)
					{
						const lastView = this._cacheManager.getItem("lastView", "/home");
						this._router.navigateByUrl(lastView);
					}
					break;
				case "NavigationEnd" :
					this._cacheManager.setItem("lastView", e.urlAfterRedirects);
					break;
			}
		});
		
		this._updateManager.check();
	};
	
	return ng.core.Class({
		extends:AbstractModel,
		constructor: [MsdbService, ConnectionManager, ng.router.Router, CacheManager, UpdateManager, AppModel],
		_getInitData:function()
		{
			return null;
		}
	});		
});