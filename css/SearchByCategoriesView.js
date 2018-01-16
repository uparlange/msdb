define(["AbstractView", "AbstractClassHelper", "SearchByCategoriesModel", "AppUtils"],
	function (AbstractView, AbstractClassHelper, SearchByCategoriesModel, AppUtils) {
		return AppUtils.getClass({
			extends: AbstractView,
			constructor: function SearchByCategoriesView(AbstractClassHelper, SearchByCategoriesModel) {
				AbstractView.call(this, AbstractClassHelper, SearchByCategoriesModel);
			},
			parameters: [
				[AbstractClassHelper], [SearchByCategoriesModel]
			],
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("search-by-categories"))
			]
		});
	}
);