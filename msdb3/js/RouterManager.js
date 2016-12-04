define(["app:AbstractManager", "app:CacheManager", "app:AppUtils"],
function (AbstractManager, CacheManager, AppUtils) 
{
	return ng.core.Class({
		extends:AbstractManager,
        constructor: [ng.router.Router, ng.common.Location, CacheManager, 
			function RouterManager (Router, Location, CacheManager)
			{
				AbstractManager.call(this);
				
				this._router = Router;
				this._location = Location;
				this._cacheManager = CacheManager;
				
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
			}
		],
		init:function()
		{
			
		}
    });
});