define(["AbstractView", "AbstractClassHelper", "SearchByYearsModel", "AppUtils"],
	function (AbstractView, AbstractClassHelper, SearchByYearsModel, AppUtils) {
		return AppUtils.getClass({
			extends: AbstractView,
			constructor: function SearchByYearsView(AbstractClassHelper, SearchByYearsModel) {
				AbstractView.call(this, AbstractClassHelper, SearchByYearsModel);
			},
			parameters: [
				[AbstractClassHelper], [SearchByYearsModel]
			],
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("searchByYears"))
			]
		});
	}
);