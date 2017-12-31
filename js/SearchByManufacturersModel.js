define(["AppUtils", "AbstractModel", "AbstractModelHelper"],
	function (AppUtils, AbstractModel, AbstractModelHelper) {
		return AppUtils.getClass({
			extends: AbstractModel,
			constructor: function SearchByManufacturersModel(AbstractModelHelper) {
				AbstractModel.call(this, AbstractModelHelper);
			},
			parameters: [
				[AbstractModelHelper]
			],
			functions: {
				onRefresh: function (callback) {
					this.getServices().getManufacturers().subscribe((data) => {
						this.data.list = this.getGroupedArrayByFirstLetter(data, "label");
						callback();
					});
				},
				trackByLabel: function (index, item) {
					return item ? item.label : undefined;
				},
				_getInitData: function () {
					return {
						list: null
					};
				}
			}
		});
	}
);