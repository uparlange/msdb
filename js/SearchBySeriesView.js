define(["AbstractView", "SearchBySeriesModel", "AppUtils"],
	function (AbstractView, SearchBySeriesModel, AppUtils) {
		return AppUtils.getClass({
			extends: AbstractView,
			constructor: function SearchBySeriesView(SearchBySeriesModel, ActivatedRoute) {
				AbstractView.call(this, SearchBySeriesModel, ActivatedRoute);
			},
			parameters: [
				[SearchBySeriesModel], [ng.router.ActivatedRoute]
			],
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("searchBySeries"))
			]
		});
	}
);