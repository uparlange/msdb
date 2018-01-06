define(["AbstractView", "AbstractClassHelper", "SearchByVersionsModel", "AppUtils"],
	function (AbstractView, AbstractClassHelper, SearchByVersionsModel, AppUtils) {
		return AppUtils.getClass({
			extends: AbstractView,
			constructor: function SearchByVersionsView(AbstractClassHelper, SearchByVersionsModel) {
				AbstractView.call(this, AbstractClassHelper, SearchByVersionsModel);
			},
			parameters: [
				[AbstractClassHelper], [SearchByVersionsModel]
			],
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("searchByVersions"))
			]
		});
	}
);