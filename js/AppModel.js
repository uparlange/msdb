define(["app:AbstractModel", "app:MsdbService", "app:ConnectionManager", "app:TranslateManager", "app:AppUtils",
		"app:CacheManager"], 
function(AbstractModel, MsdbService, ConnectionManager, TranslateManager, AppUtils,
		 CacheManager) 
{
	const AppModel = function (MsdbService, ConnectionManager, Router, TranslateManager, CacheManager)
	{
		AbstractModel.call(this, MsdbService, ConnectionManager);
		
		this._router = Router;
		this._translateManager = TranslateManager;
		this._cacheManager = CacheManager;
		
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
		
		if(window.applicationCache.status === window.applicationCache.UPDATEREADY)
		{
			this._askForReload();
		}
		else
		{
			window.applicationCache.addEventListener("updateready", () =>
			{
				this._askForReload();
			});
		}
	};
	
	return ng.core.Class({
		extends:AbstractModel,
		constructor: [MsdbService, ConnectionManager, ng.router.Router, TranslateManager, CacheManager, AppModel],
		_askForReload : function()
		{
			this._translateManager.getValues(["L10N_NEW_VERSION"]).subscribe((translations) =>
			{
				if (confirm(translations.L10N_NEW_VERSION))
				{
					window.location.reload();
				}
			});
		},
		_getInitData:function()
		{
			return null;
		}
	});		
});