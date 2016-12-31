define(["app:AbstractView", "app:AppModel", "app:AppUtils", "app:TranslateManager", "app:ConnectionManager",
		"app:UpdateManager", "app:RouterManager"], 
function(AbstractView, AppModel, AppUtils, TranslateManager, ConnectionManager,
		UpdateManager, RouterManager) 
{
	return ng.core.Component(AppUtils.getComponentConfiguration("app")).Class(
	{
		extends:AbstractView,
		constructor: [AppModel, ng.router.ActivatedRoute, ng.core.ViewContainerRef,  ng.material.MdSnackBar, TranslateManager, 
					  ConnectionManager, UpdateManager, RouterManager, ng.router.Router, ng.core.NgZone,
			function AppView (AppModel, ActivatedRoute, ViewContainerRef, MdSnackBar, TranslateManager, 
							  ConnectionManager, UpdateManager, RouterManager, Router, NgZone)
			{
				AbstractView.call(this, AppModel, ActivatedRoute);

				this._viewContainerRef = ViewContainerRef;
				this._mdSnackBar = MdSnackBar;
				this._translateManager = TranslateManager;
				this._connectionManager = ConnectionManager;
				this._updateManager = UpdateManager;
				this._routerManager = RouterManager;
				this._router = Router;
				this._ngZone = NgZone;

				this._routerManager.init();
				
				this._updateManager.init();

				this._initToaster();

				if(AppUtils.isDesktopMode())
				{
					this._initMenuBar();

					SystemJS.import("js/player.js").then((server) => {
						server.init();
					});
				}
			}
		],
		_showView:function(view)
		{
			this._ngZone.run(() =>
			{
				this._router.navigate([view]);
			});	
		},
		_initMenuBar:function()
		{
			const menu = new nw.Menu({type:"menubar"});
				
			const fileSubMenu = new nw.Menu();
			fileSubMenu.append(new nw.MenuItem({
				label:"Quitter",
				click:() => {
					nw.App.quit();
				}
			}));
			menu.append(new nw.MenuItem({
				label:"Fichier",
				submenu:fileSubMenu
			}));

			const displaySubMenu = new nw.Menu();
			displaySubMenu.append(new nw.MenuItem({
				label:"Mes jeux",
				click:() => {
					this._showView("/mygames");
				}
			}));
			displaySubMenu.append(new nw.MenuItem({
				label:"Configuration",
				click:() => {
					this._showView("/config");
				}
			}));
			menu.append(new nw.MenuItem({
				label:"Afficher",
				submenu:displaySubMenu
			}));

			nw.Window.get().menu = menu;
		},
		_initToaster:function()
		{
			this._connectionManager.on("change").subscribe((online) =>
			{
				const config = new ng.material.MdSnackBarConfig();
				config.duration = 1500;
				config.viewContainerRef = this._viewContainerRef;

				const key = online ? "L10_CONNECTED" : "L10_NO_CONNECTION";

				this._translateManager.getValues([key]).subscribe((translations) => 
				{
					this._mdSnackBar.open(translations[key], null, config);
				});
			});
		}
	});
});