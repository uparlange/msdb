define(["AbstractView", "SearchByDescriptionModel", "AppUtils"],
	function (AbstractView, SearchByDescriptionModel, AppUtils) {
		return AppUtils.getClass({
			extends: AbstractView,
			constructor: function SearchByDescriptionView(SearchByDescriptionModel, ActivatedRoute) {
				AbstractView.call(this, SearchByDescriptionModel, ActivatedRoute);
			},
			parameters: [
				[SearchByDescriptionModel], [ng.router.ActivatedRoute]
			],
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("searchByDescription"))
			]
		});
	}
);