define(["app:AbstractViewModel", "app:MsdbService", "app:ConnectionManager"], 
function(AbstractViewModel, MsdbService, ConnectionManager) 
{
	return ng.core.Class({
		extends:AbstractViewModel,
		constructor: [MsdbService, ConnectionManager, ng.router.Router,
			function (MsdbService, ConnectionManager, Router)
			{
				AbstractViewModel.call(this, MsdbService, ConnectionManager);
				
				this._router = Router;
				
				this._routerEventsSubscriber = null;
			}
		],
		_init : function()
		{
			this._routerEventsSubscriber = this._router.events.subscribe((e) =>
			{
				switch(e.constructor.name)
				{
					case "NavigationStart" :
						if(e.id === 1)
						{
							if(e.url !== "/mygames")
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
		},
		_destroy:function()
		{
			this._routerEventsSubscriber.unsubscribe();
		},
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