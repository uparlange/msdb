define(["AppUtils", "AbstractManager", "TranslateManager", "WindowRef"],
	function (AppUtils, AbstractManager, TranslateManager, WindowRef) {
		return AppUtils.getClass({
			extends: AbstractManager,
			constructor: function UpdateManager(TranslateManager, WindowRef) {
				AbstractManager.call(this);
				this._translateManager = TranslateManager;
				this._window = WindowRef.nativeWindow;
				this._checked = false;
				this._window.applicationCache.addEventListener("updateready", () => {
					this._askForReload();
				});
				/*
				if ("serviceWorker" in navigator) {
					navigator.serviceWorker.register("sw.js").then((reg) => {
						this.getLogger().info("Registration succeeded. Scope is " + reg.scope);
					}).catch((error) => {
						this.getLogger().error("Registration failed with " + error);
					});
				};
				*/
			},
			parameters: [
				[TranslateManager], [WindowRef]
			],
			functions: {
				init: function () {
					AbstractManager.prototype.init.call(this);
					if (this._window.applicationCache.status === this._window.applicationCache.UPDATEREADY) {
						this._askForReload();
					}
				},
				_askForReload: function () {
					if (!this._checked) {
						this._translateManager.getValues(["L10N_NEW_VERSION"]).subscribe((translations) => {
							if (confirm(translations.L10N_NEW_VERSION)) {
								this._checked = true;
								this._window.location.reload();
							}
						});
					}
				}
			}
		});
	}
);