define(["AbstractView", "AbstractClassHelper", "SearchByDescriptionModel", "AppUtils"],
	function (AbstractView, AbstractClassHelper, SearchByDescriptionModel, AppUtils) {
		return AppUtils.getClass({
			extends: AbstractView,
			constructor: function SearchByDescriptionView(AbstractClassHelper, SearchByDescriptionModel) {
				AbstractView.call(this, AbstractClassHelper, SearchByDescriptionModel);
			},
			parameters: [
				[AbstractClassHelper], [SearchByDescriptionModel]
			],
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("searchByDescription"))
			]
		});
	}
);