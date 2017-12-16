define(["AbstractView", "SearchByYearsModel", "AppUtils"],
	function (AbstractView, SearchByYearsModel, AppUtils) {
		return AppUtils.getClass({
			extends: AbstractView,
			constructor: function SearchByYearsView(SearchByYearsModel, ActivatedRoute) {
				AbstractView.call(this, SearchByYearsModel, ActivatedRoute);
			},
			parameters: [
				[SearchByYearsModel], [ng.router.ActivatedRoute]
			],
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("searchByYears"))
			]
		});
	}
);