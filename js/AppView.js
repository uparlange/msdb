define(["AbstractView", "AppModel", "AppUtils", "TranslateManager", "ConnectionManager",
	"UpdateManager", "RouterManager", "Shell"],
	function (AbstractView, AppModel, AppUtils, TranslateManager, ConnectionManager,
		UpdateManager, RouterManager, Shell) {
		return AppUtils.getClass({
			extends: AbstractView,
			constructor: function AppView(AppModel, ActivatedRoute, ViewContainerRef, MatSnackBar, TranslateManager,
				ConnectionManager, UpdateManager, RouterManager, ElementRef, Renderer,
				Shell) {
				AbstractView.call(this, AppModel, ActivatedRoute);
				this._viewContainerRef = ViewContainerRef;
				this._matSnackBar = MatSnackBar;
				this._translateManager = TranslateManager;
				this._connectionManager = ConnectionManager;
				this._updateManager = UpdateManager;
				this._routerManager = RouterManager;
				this._element = ElementRef.nativeElement;
				this._renderer = Renderer;
				this._shell = Shell;
			},
			parameters: [
				[AppModel], [ng.router.ActivatedRoute], [ng.core.ViewContainerRef], [ng.material.MatSnackBar], [TranslateManager],
				[ConnectionManager], [UpdateManager], [RouterManager], [ng.core.ElementRef], [ng.core.Renderer],
				[Shell]
			],
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("app", {
					selector: "body"
				}))
			],
			functions: {
				onInit: function () {
					this._shell.init();
					this._initBackground();
					this._initToaster();
					if (AppUtils.runInNw()) {
						this._initNw();
					}
				},
				_initNw: function () {
					this._initMenuBar();
					SystemJS.import("Nw").then((Nw) => {
						Nw.init();
					});
				},
				_showView: function (view) {
					this._routerManager.navigate([view]);
				},
				_initMenuBar: function () {
					const pkg = require("./package.json");
					this._translateManager.getValues(["L10N_QUIT", "L10N_FILE", "L10N_MY_GAMES", "L10N_CONFIG", "L10N_DISPLAY"]).subscribe((translations) => {
						const menu = new nw.Menu({ type: "menubar" });
						const fileSubMenu = new nw.Menu();
						fileSubMenu.append(new nw.MenuItem({
							label: translations.L10N_QUIT,
							click: () => {
								nw.App.quit();
							}
						}));
						menu.append(new nw.MenuItem({
							label: translations.L10N_FILE,
							submenu: fileSubMenu
						}));
						const displaySubMenu = new nw.Menu();
						displaySubMenu.append(new nw.MenuItem({
							label: translations.L10N_MY_GAMES,
							click: () => {
								this._showView("/mygames");
							}
						}));
						displaySubMenu.append(new nw.MenuItem({
							label: translations.L10N_CONFIG,
							click: () => {
								this._showView("/config");
							}
						}));
						menu.append(new nw.MenuItem({
							label: translations.L10N_DISPLAY,
							submenu: displaySubMenu
						}));
						const infoSubMenu = new nw.Menu();
						infoSubMenu.append(new nw.MenuItem({
							label: "v" + pkg.version
						}));
						menu.append(new nw.MenuItem({
							label: "?",
							submenu: infoSubMenu
						}));
						nw.Window.get().menu = menu;
					});
				},
				_initBackground: function () {
					this._renderer.setElementStyle(this._element, "background-size", "100% 100%");
					this._renderer.setElementStyle(this._element, "background-attachment", "fixed");
					this._renderer.setElementStyle(this._element, "background-image", "url('images/background.jpg')");
				},
				_initToaster: function () {
					this._connectionManager.on("change").subscribe((online) => {
						const config = new ng.material.MatSnackBarConfig();
						config.duration = 1500;
						config.viewContainerRef = this._viewContainerRef;
						const key = online ? "L10_CONNECTED" : "L10_NO_CONNECTION";
						this._translateManager.getValues([key]).subscribe((translations) => {
							this._matSnackBar.open(translations[key], null, config);
						});
					});
				}
			}
		})
	}
);