define(["AbstractView", "AbstractClassHelper", "ConfigModel", "AppUtils"],
	function (AbstractView, AbstractClassHelper, ConfigModel, AppUtils) {
		return AppUtils.getClass({
			extends: AbstractView,
			constructor: function ConfigView(AbstractClassHelper, ConfigModel) {
				AbstractView.call(this, AbstractClassHelper, ConfigModel);
			},
			parameters: [
				[AbstractClassHelper], [ConfigModel]
			],
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("config"))
			],
			functions: {
				onLanguageChanged: function (event) {
					this.getLabels().setLanguage(event.value);
				}
			}
		});
	}
);