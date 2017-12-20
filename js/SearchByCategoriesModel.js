define(["AppUtils", "AbstractModel", "MsdbService", "ConnectionManager"],
	function (AppUtils, AbstractModel, MsdbService, ConnectionManager) {
		return AppUtils.getClass({
			extends: AbstractModel,
			constructor: function SearchByCategoriesModel(MsdbService, ConnectionManager, Title) {
				AbstractModel.call(this, MsdbService, ConnectionManager, Title);
			},
			parameters: [
				[MsdbService], [ConnectionManager], [ng.platformBrowser.Title]
			],
			functions: {
				onRefresh: function () {
					const categories = [];
					const category_map = {};
					this._msdbService.getCategories().subscribe((data) => {
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
					});
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