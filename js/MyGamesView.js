define(["AbstractView", "MyGamesModel", "AppUtils"],
	function (AbstractView, MyGamesModel, AppUtils) {
		return AppUtils.getClass({
			extends: AbstractView,
			constructor: function MyGamesView(MyGamesModel, ActivatedRoute) {
				AbstractView.call(this, MyGamesModel, ActivatedRoute);
			},
			parameters: [
				[MyGamesModel], [ng.router.ActivatedRoute]
			],
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("myGames"))
			]
		});
	}
);