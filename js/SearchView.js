define(["AbstractView", "SearchModel", "AppUtils", "RouterManager"],
	function (AbstractView, SearchModel, AppUtils, RouterManager) {
		return AppUtils.getClass({
			extends: AbstractView,
			constructor: function SearchView(SearchModel, ActivatedRoute, RouterManager) {
				AbstractView.call(this, SearchModel, ActivatedRoute);
				this._routerManager = RouterManager;
			},
			parameters: [
				[SearchModel], [ng.router.ActivatedRoute], [RouterManager]
			],
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("search"))
			],
			functions: {
				tabChanged: function (event) {
					this.model.tabChanged(event);
					const url = "/search/" + this.model.getTabsInfo().byIndex(event.index).type;
					this._routerManager.navigate([url]);
				}
			}
		});
	}
);