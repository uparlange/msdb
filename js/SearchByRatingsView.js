define(["AbstractView", "AbstractClassHelper", "SearchByRatingsModel", "AppUtils"],
	function (AbstractView, AbstractClassHelper, SearchByRatingsModel, AppUtils) {
		return AppUtils.getClass({
			extends: AbstractView,
			constructor: function SearchByYearsView(AbstractClassHelper, SearchByRatingsModel) {
				AbstractView.call(this, AbstractClassHelper, SearchByRatingsModel);
			},
			parameters: [
				[AbstractClassHelper], [SearchByRatingsModel]
			],
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("searchByRatings"))
			]
		});
	}
);