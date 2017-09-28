define(["AbstractView", "HomeModel", "AppUtils"],
	function (AbstractView, HomeModel, AppUtils) {
		return AppUtils.getClass({
			extends: AbstractView,
			constructor: function HomeView(HomeModel, ActivatedRoute) {
				AbstractView.call(this, HomeModel, ActivatedRoute);
			},
			parameters: [
				[HomeModel], [ng.router.ActivatedRoute]
			],
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("home"))
			]
		});
	}
);