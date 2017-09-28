define(["AbstractView", "BotModel", "AppUtils"],
	function (AbstractView, BotModel, AppUtils) {
		return AppUtils.getClass({
			extends: AbstractView,
			constructor: function BotView(BotModel, ActivatedRoute) {
				AbstractView.call(this, BotModel, ActivatedRoute);
			},
			parameters: [
				[BotModel], [ng.router.ActivatedRoute]
			],
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("bot"))
			]
		});
	}
);