define(["AbstractView", "AbstractClassHelper", "BotModel", "AppUtils"],
	function (AbstractView, AbstractClassHelper, BotModel, AppUtils) {
		return AppUtils.getClass({
			extends: AbstractView,
			constructor: function BotView(AbstractClassHelper, BotModel) {
				AbstractView.call(this, AbstractClassHelper, BotModel);
			},
			parameters: [
				[AbstractClassHelper], [BotModel]
			],
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("bot"))
			]
		});
	}
);