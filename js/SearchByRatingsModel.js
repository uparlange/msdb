define(["AppUtils", "AbstractModel", "AbstractClassHelper", "MsdbService"],
	function (AppUtils, AbstractModel, AbstractClassHelper, MsdbService) {
		return AppUtils.getClass({
			extends: AbstractModel,
			constructor: function SearchByYearsModel(AbstractClassHelper, MsdbService) {
				AbstractModel.call(this, AbstractClassHelper, MsdbService);
			},
			parameters: [
				[AbstractClassHelper], [MsdbService]
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
						this.getServices().getRatings().subscribe((data) => {
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