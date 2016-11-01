define(["app:TranslateManager"], 
function(TranslateManager) 
{
	return ng.core.Class({
		constructor: [TranslateManager, ng.router.Router,
			function (translateManager, router)
			{
				this._translateManager = translateManager;
				
				this._router = router;

				this.data = this._getInitData();
				
				this._onLanguageChangeSubscriber = null;
				
				this._routerEventsSubscriber = null;
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
							let lastView = localStorage.getItem("MSDB.lastView") || "/home";
							if(e.urlAfterRedirects === "/mygames")
							{
								lastView = e.urlAfterRedirects;
							}
							this._router.navigateByUrl(lastView);
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