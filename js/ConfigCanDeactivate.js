define(["AppUtils", "AbstractClass", "TranslateManager"],
	function (AppUtils, AbstractClass, TranslateManager) {
		return AppUtils.getClass({
			extends: AbstractClass,
			constructor: function ConfigCanDeactivate(TranslateManager) {
				AbstractClass.call(this);
				this._translateManager = TranslateManager;
			},
			parameters: [
				[TranslateManager]
			],
			functions: {
				canDeactivate: function (component) {
					const eventEmitter = new ng.core.EventEmitter();
					setTimeout(() => {
						if (component.model.hasChanges()) {
							this._translateManager.getValues(["L10N_CONFIRM_QUIT"]).subscribe((translations) => {
								eventEmitter.emit(window.confirm(translations.L10N_CONFIRM_QUIT));
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