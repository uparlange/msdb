define(["AbstractView", "SearchByCategoriesModel", "AppUtils"],
	function (AbstractView, SearchByCategoriesModel, AppUtils) {
		return AppUtils.getClass({
			extends: AbstractView,
			constructor: function SearchByCategoriesView(SearchByCategoriesModel, ActivatedRoute) {
				AbstractView.call(this, SearchByCategoriesModel, ActivatedRoute);
			},
			parameters: [
				[SearchByCategoriesModel], [ng.router.ActivatedRoute]
			],
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("search-by-categories"))
			]
		});
	}
);