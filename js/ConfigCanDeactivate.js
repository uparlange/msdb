define(["AppUtils", "AbstractClass", "TranslateManager", "WindowRef"],
	function (AppUtils, AbstractClass, TranslateManager, WindowRef) {
		return AppUtils.getClass({
			extends: AbstractClass,
			constructor: function ConfigCanDeactivate(TranslateManager, WindowRef) {
				AbstractClass.call(this);
				this._translateManager = TranslateManager;
				this._windowRef = WindowRef;
			},
			parameters: [
				[TranslateManager], [WindowRef]
			],
			functions: {
				canDeactivate: function (component) {
					const eventEmitter = new ng.core.EventEmitter();
					setTimeout(() => {
						if (component.model.hasChanges()) {
							this._translateManager.getValues(["L10N_CONFIRM_QUIT"]).subscribe((translations) => {
								eventEmitter.emit(this._windowRef.nativeWindow.confirm(translations.L10N_CONFIRM_QUIT));
							});
						}
						else {
							eventEmitter.emit(true);
						}
					}, 0);
					return eventEmitter;
				}
			}
		});
	}
);