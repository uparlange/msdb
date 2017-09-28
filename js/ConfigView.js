define(["AbstractView", "ConfigModel", "AppUtils"],
	function (AbstractView, ConfigModel, AppUtils) {
		return AppUtils.getClass({
			extends: AbstractView,
			constructor: function ConfigView(ConfigModel, ActivatedRoute) {
				AbstractView.call(this, ConfigModel, ActivatedRoute);
			},
			parameters: [
				[ConfigModel], [ng.router.ActivatedRoute]
			],
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("config"))
			]
		});
	}
);