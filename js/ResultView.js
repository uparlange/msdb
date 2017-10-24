define(["AbstractView", "ResultModel", "AppUtils"],
	function (AbstractView, ResultModel, AppUtils) {
		return AppUtils.getClass({
			extends: AbstractView,
			constructor: function ResultView(ResultModel, ActivatedRoute) {
				AbstractView.call(this, ResultModel, ActivatedRoute);
			},
			parameters: [
				[ResultModel], [ng.router.ActivatedRoute]
			],
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("result"))
			]
		});
	}
);