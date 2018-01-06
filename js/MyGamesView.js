define(["AbstractView", "AbstractClassHelper", "MyGamesModel", "AppUtils"],
	function (AbstractView, AbstractClassHelper, MyGamesModel, AppUtils) {
		return AppUtils.getClass({
			extends: AbstractView,
			constructor: function MyGamesView(AbstractClassHelper, MyGamesModel) {
				AbstractView.call(this, AbstractClassHelper, MyGamesModel);
			},
			parameters: [
				[AbstractClassHelper], [MyGamesModel]
			],
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("myGames"))
			]
		});
	}
);