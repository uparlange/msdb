define(["AbstractView", "SearchByCategoriesModel", "AppUtils", "RouterManager"],
	function (AbstractView, SearchByCategoriesModel, AppUtils, RouterManager) {
		return AppUtils.getClass({
			extends: AbstractView,
			constructor: function SearchByCategoriesView(SearchByCategoriesModel, ActivatedRoute, RouterManager) {
				AbstractView.call(this, SearchByCategoriesModel, ActivatedRoute);
				this._routerManager = RouterManager;
			},
			parameters: [
				[SearchByCategoriesModel], [ng.router.ActivatedRoute], [RouterManager]
			],
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("searchByCategories"))
			],
			functions: {
				itemClickHandler: function (item) {
					this._routerManager.navigate(["/result"], { queryParams: { type: "category", value: item.data } });
				}
			}
		});
	}
);