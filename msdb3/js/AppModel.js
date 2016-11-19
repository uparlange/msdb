define(["app:AbstractModel", "app:MsdbService", "app:ConnectionManager", "app:TranslateManager", "app:AppUtils"], 
function(AbstractModel, MsdbService, ConnectionManager, TranslateManager, AppUtils) 
{
	const AppModel = function (MsdbService, ConnectionManager, Router, TranslateManager)
	{
		AbstractModel.call(this, MsdbService, ConnectionManager);
		
		this._router = Router;
		this._translateManager = TranslateManager;
		
		this._routerEventsSubscriber = this._router.events.subscribe((e) =>
		{
			switch(e.constructor.name)
			{
				case "NavigationStart" :
					if(e.id === 1)
					{
						// load last page on mobile devices
						if(AppUtils.getDevice().mobile() !== null)
						{
							const lastView = localStorage.getItem("MSDB.lastView") || "/home";
							this._router.navigateByUrl(lastView);
						}
					}
					break;
				case "NavigationEnd" :
					localStorage.setItem("MSDB.lastView", e.urlAfterRedirects);
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
		constructor: [MsdbService, ConnectionManager, ng.router.Router, TranslateManager, AppModel],
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