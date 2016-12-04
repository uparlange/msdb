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
				
				this._mutationObserver = null;
			
				this._bodyRef = document.querySelector("body");
				
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
								const scrollTop = this._bodyRef.scrollTop;
								this._cacheManager.setItem("scrollTop_" + this.getCurrentPath(), scrollTop);
							}
							break;
						case "NavigationEnd" :
							this._cacheManager.setItem("lastView", e.urlAfterRedirects);
							this._enableMutationObserver();
							break;
					}
				});
			}
		],
		init:function()
		{
			
		},
		getCurrentPath:function()
		{
			return this._location.path(true);
		},
		_disableMutationObserver:function()
		{
			if(this._mutationObserver !== null)
			{
				this._mutationObserver.disconnect();
				this._mutationObserver = null;
			}
		},
		_enableMutationObserver:function()
		{
			if(this._mutationObserver === null)
			{
				this._mutationObserver = new MutationObserver((mutations) => 
				{
					if(this._creationCompleteTimeout !== null)
					{
						clearTimeout(this._creationCompleteTimeout);
					}
					this._creationCompleteTimeout = setTimeout(() =>
					{ 
						this._disableMutationObserver();
						
						const scrollTop = this._cacheManager.getItem("scrollTop_" + this.getCurrentPath(), 0);
						this._bodyRef.scrollTop = scrollTop;
					},50);
				});
				const config = {
					childList:true,
					attributes:false,
					characterData:false,
					subtree: true	
				};
				this._mutationObserver.observe(this._bodyRef, config);
			}
		}
    });
});