define(["AppUtils", "AbstractManager", "TranslateManager", "WindowRef"],
	function (AppUtils, AbstractManager, TranslateManager, WindowRef) {
		return AppUtils.getClass({
			extends: AbstractManager,
			constructor: function UpdateManager(TranslateManager, WindowRef) {
				AbstractManager.call(this);
				this._translateManager = TranslateManager;
				this._windowRef = WindowRef;
				this._checked = false;
			},
			parameters: [
				[TranslateManager], [WindowRef]
			],
			functions: {
				init: function () {
					AbstractManager.prototype.init.call(this);
					this._windowRef.nativeWindow.applicationCache.addEventListener("updateready", () => {
						this._askForReload();
					});
					if (this._windowRef.nativeWindow.applicationCache.status === this._windowRef.nativeWindow.applicationCache.UPDATEREADY) {
						this._askForReload();
					}
				},
				_askForReload: function () {
					if (!this._checked) {
						this._translateManager.getValues(["L10N_NEW_VERSION"]).subscribe((translations) => {
							if (confirm(translations.L10N_NEW_VERSION)) {
								this._checked = true;
								this._windowRef.nativeWindow.location.reload();
							}
						});
					}
				}
			}
		});
	}
);