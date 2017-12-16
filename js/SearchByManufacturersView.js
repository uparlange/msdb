define(["AbstractView", "SearchByManufacturersModel", "AppUtils"],
	function (AbstractView, SearchByManufacturersModel, AppUtils) {
		return AppUtils.getClass({
			extends: AbstractView,
			constructor: function SearchByManufacturersView(SearchByManufacturersModel, ActivatedRoute) {
				AbstractView.call(this, SearchByManufacturersModel, ActivatedRoute);
			},
			parameters: [
				[SearchByManufacturersModel], [ng.router.ActivatedRoute]
			],
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("searchByManufacturers"))
			]
		});
	}
);