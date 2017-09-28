define(["AbstractView", "SearchModel", "AppUtils"],
	function (AbstractView, SearchModel, AppUtils) {
		return AppUtils.getClass({
			extends: AbstractView,
			constructor: function SearchView(SearchModel, ActivatedRoute) {
				AbstractView.call(this, SearchModel, ActivatedRoute);
			},
			parameters: [
				[SearchModel], [ng.router.ActivatedRoute]
			],
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("search"))
			]
		});
	}
);