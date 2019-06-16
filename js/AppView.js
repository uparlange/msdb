import AppUtils from "./AppUtils.js";
import AbstractView from "./AbstractView.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import AppModel from "./AppModel.js";
import Shell from "./Shell.js";

class AppView extends AbstractView {
	static get annotations() {
		return this.getAnnotations({
			selector: "app",
			host: {
				"mat-version": ng.material.VERSION.full
			}
		});
	}
	static get parameters() {
		return AppUtils.getParameters(AbstractClassHelper, AppModel, ng.core.ViewContainerRef, ng.material.MatSnackBar, Shell);
	}
	constructor(AbstractClassHelper, AppModel, ViewContainerRef, MatSnackBar, Shell) {
		super(AbstractClassHelper, AppModel);
		this._viewContainerRef = ViewContainerRef;
		this._matSnackBar = MatSnackBar;
		this._shell = Shell;
	}
	onInit() {
		this._shell.init();
		this._initToaster();
		if (AppUtils.runInNw()) {
			this._initNw();
		}
	}
	_initNw() {
		this._initMenuBar();
		AppUtils.loadModule("/js/Nw.js").subscribe((module) => {
			module.init();
		});
	}
	_showView(view) {
		this.getRouter().navigate([view]);
	}
	_initMenuBar() {
		this.getLabels().on("languageChange").subscribe(() => {
			const pkg = require("./package.json");
			this.getLabels().getValues(["L10N_QUIT", "L10N_FILE", "L10N_MY_GAMES", "L10N_CONFIGURATION", "L10N_DISPLAY"]).subscribe((translations) => {
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
					label: translations.L10N_CONFIGURATION,
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
					label: `v${pkg.version}`
				}));
				menu.append(new nw.MenuItem({
					label: "?",
					submenu: infoSubMenu
				}));
				nw.Window.get().menu = menu;
			});
		});
	}
	_initToaster() {
		this.getConnection().on("change").subscribe((online) => {
			const config = new ng.material.MatSnackBarConfig();
			config.duration = 1500;
			config.viewContainerRef = this._viewContainerRef;
			const key = online ? "L10_CONNECTED" : "L10_NO_CONNECTION";
			this.getLabels().getValues([key]).subscribe((translations) => {
				this._matSnackBar.open(translations[key], null, config);
			});
		});
	}
}

export default AppView;