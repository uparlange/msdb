define(["AppUtils", "AbstractModel", "AbstractModelHelper", "RouterManager"],
	function (AppUtils, AbstractModel, AbstractModelHelper, RouterManager) {
		return AppUtils.getClass({
			extends: AbstractModel,
			constructor: function SearchByCategoriesModel(AbstractModelHelper, RouterManager) {
				AbstractModel.call(this, AbstractModelHelper);
				this._routerManager = RouterManager;
			},
			parameters: [
				[AbstractModelHelper], [RouterManager]
			],
			functions: {
				onRefresh: function (callback) {
					this._refreshList().subscribe(() => {
						this._refreshSelection();
						callback();
					});
				},
				_refreshSelection: function () {
					if (this.data.list !== null) {
						const params = this._routerManager.getUrlQueryParams();
						if (params.hasOwnProperty("category")) {
							this.data.list.forEach((element) => {
								if (element.label === params.category) {
									this.data.selectedItem = element;
									return;
								}
							});
						}
					}
				},
				_refreshList: function () {
					const eventEmitter = new ng.core.EventEmitter();
					if (this.data.list === null) {
						const categories = [];
						const category_map = {};
						this.getServices().getCategories().subscribe((data) => {
							data.forEach((item) => {
								const item_split = item.label.split("/");
								const category = item_split[0].trim();
								if (category_map[category] == null) {
									category_map[category] = {
										label: category,
										data: null,
										children: []
									}
									categories.push(category_map[category]);
								}
								category_map[category].children.push({
									label: (item_split.length > 1) ? item_split[1].trim() : category,
									data: item.label
								});
							});
							this.data.list = categories;
							eventEmitter.emit();
						});
					} else {
						setTimeout(() => {
							eventEmitter.emit();
						}, 0);
					}
					return eventEmitter;
				},
				_getInitData: function () {
					return {
						list: null,
						selectedItem: null
					};
				}
			}
		});
	}
);