define(["AbstractView", "AbstractClassHelper", "ResultModel", "AppUtils"],
	function (AbstractView, AbstractClassHelper, ResultModel, AppUtils) {
		return AppUtils.getClass({
			extends: AbstractView,
			constructor: function ResultView(AbstractClassHelper, ResultModel) {
				AbstractView.call(this, AbstractClassHelper, ResultModel);
			},
			parameters: [
				[AbstractClassHelper], [ResultModel]
			],
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("result"))
			]
		});
	}
);