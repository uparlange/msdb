define(["AbstractView", "AbstractClassHelper", "SearchBySeriesModel", "AppUtils"],
	function (AbstractView, AbstractClassHelper, SearchBySeriesModel, AppUtils) {
		return AppUtils.getClass({
			extends: AbstractView,
			constructor: function SearchBySeriesView(AbstractClassHelper, SearchBySeriesModel) {
				AbstractView.call(this, AbstractClassHelper, SearchBySeriesModel);
			},
			parameters: [
				[AbstractClassHelper], [SearchBySeriesModel]
			],
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("searchBySeries"))
			]
		});
	}
);