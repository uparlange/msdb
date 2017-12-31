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
					this._refreshList().subscribe(() => {
						callback();
					});
				},
				trackByLabel: function (index, item) {
					return item ? item.label : undefined;
				},
				_refreshList: function () {
					const eventEmitter = new ng.core.EventEmitter();
					if (this.data.list === null) {
						this.getServices().getYears().subscribe((data) => {
							this.data.list = this.getGroupedArrayByItemsNumber(data, 20);
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
						list: null
					};
				}
			}
		});
	}
);