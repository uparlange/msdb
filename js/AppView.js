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

				this._initBackground();

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
		_initBackground:function()
		{
			/* TODO find better way */
			const body = document.getElementsByTagName("body")[0];
			body.style.size = "100% 100%";
			body.style.backgroundAttachment = "fixed";
			body.style.backgroundImage = "url('images/background.jpg')";
		},
		_showView:function(view)
		{
			this._ngZone.run(() =>
			{
				this._router.navigate([view]);
			});	
		},
		_initMenuBar:function()
		{
			const pkg = require("./package.json");

			this._translateManager.getValues(["L10N_QUIT", "L10N_FILE", "L10N_MY_GAMES", "L10N_CONFIG", "L10N_DISPLAY"]).subscribe((translations) => 
			{
				const menu = new nw.Menu({type:"menubar"});
					
				const fileSubMenu = new nw.Menu();
				fileSubMenu.append(new nw.MenuItem({
					label:translations.L10N_QUIT,
					click:() => {
						nw.App.quit();
					}
				}));
				menu.append(new nw.MenuItem({
					label:translations.L10N_FILE,
					submenu:fileSubMenu
				}));

				const displaySubMenu = new nw.Menu();
				displaySubMenu.append(new nw.MenuItem({
					label:translations.L10N_MY_GAMES,
					click:() => {
						this._showView("/mygames");
					}
				}));
				displaySubMenu.append(new nw.MenuItem({
					label:translations.L10N_CONFIG,
					click:() => {
						this._showView("/config");
					}
				}));
				menu.append(new nw.MenuItem({
					label:translations.L10N_DISPLAY,
					submenu:displaySubMenu
				}));

				const infoSubMenu = new nw.Menu();
				infoSubMenu.append(new nw.MenuItem({
					label:"v"+pkg.version
				}));
				menu.append(new nw.MenuItem({
					label:"?",
					submenu:infoSubMenu
				}));

				nw.Window.get().menu = menu;
			});
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