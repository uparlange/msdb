define(["app:TranslateManager", "app:ConnectionManager"], 
function(TranslateManager, ConnectionManager) 
{
	return ng.core.Class({
		constructor: [TranslateManager, ng.router.Router, ConnectionManager,
			function (translateManager, router, connectionManager)
			{
				this._translateManager = translateManager;
				this._router = router;
				this._connectionManager = connectionManager;

				this.data = this._getInitData();
				
				this._onLanguageChangeSubscriber = null;
				
				this._routerEventsSubscriber = null;
				
				this._onOnlineChangeSubscriber = null;
			}
		],
		init : function()
		{
			this.data.lang = this._translateManager.getCurrentLanguage();
				
			this._onLanguageChangeSubscriber = this._translateManager.onLanguageChange.subscribe(() => 
			{
				this.data.lang = this._translateManager.getCurrentLanguage();
			});
			
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
			
			this.data.online = this._connectionManager.online;
			
			this._onOnlineChangeSubscriber = this._connectionManager.on("change").subscribe((online) =>
			{
				this.data.online = online;
			});
		},
		destroy:function()
		{
			this._onLanguageChangeSubscriber.unsubscribe();
			
			this._routerEventsSubscriber.unsubscribe();
		},
		toggleLanguage:function()
		{
			this._translateManager.setLanguage(this.data.lang === "fr" ? "en" : "fr");
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
		_getInitData : function()
		{
			return {
				lang:null
			};
		}
	});		
});