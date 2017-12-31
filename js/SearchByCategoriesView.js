define(["AbstractView", "SearchByCategoriesModel", "AppUtils", "RouterManager", "WindowRef"],
	function (AbstractView, SearchByCategoriesModel, AppUtils, RouterManager, WindowRef) {
		return AppUtils.getClass({
			extends: AbstractView,
			constructor: function SearchByCategoriesView(SearchByCategoriesModel, ActivatedRoute, RouterManager, WindowRef) {
				AbstractView.call(this, SearchByCategoriesModel, ActivatedRoute);
				this._routerManager = RouterManager;
				this._window = WindowRef.nativeWindow;
			},
			parameters: [
				[SearchByCategoriesModel], [ng.router.ActivatedRoute], [RouterManager], [WindowRef]
			],
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("searchByCategories"))
			],
			functions: {
				itemChangeHandler: function (event) {
					this._routerManager.navigate([], { queryParams: { category: event.item.label } });
				},
				itemClickHandler: function (item) {
					this._routerManager.navigate(["/result"], { queryParams: { type: "category", value: item.data } });
				}
			}
		});
	}
);