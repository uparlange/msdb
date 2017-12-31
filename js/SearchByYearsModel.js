define(["AppUtils", "AbstractModel", "AbstractModelHelper"],
	function (AppUtils, AbstractModel, AbstractModelHelper) {
		return AppUtils.getClass({
			extends: AbstractModel,
			constructor: function SearchByYearsModel(AbstractModelHelper) {
				AbstractModel.call(this, AbstractModelHelper);
			},
			parameters: [
				[AbstractModelHelper]
			],
			functions: {
				onRefresh: function (callback) {
					this.getServices().getYears().subscribe((data) => {
						this.data.list = data;
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