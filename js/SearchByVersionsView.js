define(["AbstractView", "SearchByVersionsModel", "AppUtils"],
	function (AbstractView, SearchByVersionsModel, AppUtils) {
		return AppUtils.getClass({
			extends: AbstractView,
			constructor: function SearchByVersionsView(SearchByVersionsModel, ActivatedRoute) {
				AbstractView.call(this, SearchByVersionsModel, ActivatedRoute);
			},
			parameters: [
				[SearchByVersionsModel], [ng.router.ActivatedRoute]
			],
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("searchByVersions"))
			]
		});
	}
);