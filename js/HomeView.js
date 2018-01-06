define(["AbstractView", "AbstractClassHelper", "HomeModel", "AppUtils"],
	function (AbstractView, AbstractClassHelper, HomeModel, AppUtils) {
		return AppUtils.getClass({
			extends: AbstractView,
			constructor: function HomeView(AbstractClassHelper, HomeModel) {
				AbstractView.call(this, AbstractClassHelper, HomeModel);
			},
			parameters: [
				[AbstractClassHelper], [HomeModel]
			],
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("home"))
			]
		});
	}
);