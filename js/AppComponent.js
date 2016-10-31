define(["app:AppProvider", "app:AppUtils"], 
function(AppProvider, AppUtils) 
{
	const componentName = "app";
	
	return ng.core.Component({
		selector: componentName,
		templateUrl: AppUtils.getTemplateUrl(componentName),
		styleUrls: AppUtils.getStyleUrls(componentName)
	}).Class({
		constructor: [AppProvider, ng.router.Router,
			function (model, router)
			{
				this.model = model;
				
				this._router = router;
				
				this._routerEventsSubscriber = null;
			}
		],
		ngOnInit:function()
		{
			this.model.init();
			
			this._routerEventsSubscriber = this._router.events.subscribe((event) =>
			{
				switch(event.constructor.name)
				{
					case "NavigationStart" :
						if(event.id === 1)
						{
							let lastView = localStorage.getItem("MSDB.lastView");
							if(event.urlAfterRedirects === "/mygames")
							{
								lastView = event.urlAfterRedirects;
							}
							this._router.navigateByUrl(lastView);
						}
						break;
					case "NavigationEnd" :
						localStorage.setItem("MSDB.lastView", event.urlAfterRedirects);
						break;
				}
			});
		},
		toggleLanguage:function()
		{
			this.model.toggleLanguage();
		}
	});
});