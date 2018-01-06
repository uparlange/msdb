define(["AbstractView", "AbstractClassHelper", "SearchByManufacturersModel", "AppUtils"],
	function (AbstractView, AbstractClassHelper, SearchByManufacturersModel, AppUtils) {
		return AppUtils.getClass({
			extends: AbstractView,
			constructor: function SearchByManufacturersView(AbstractClassHelper, SearchByManufacturersModel) {
				AbstractView.call(this, AbstractClassHelper, SearchByManufacturersModel);
			},
			parameters: [
				[AbstractClassHelper], [SearchByManufacturersModel]
			],
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("searchByManufacturers"))
			]
		});
	}
);