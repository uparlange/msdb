define(["AppUtils", "AbstractModel", "AbstractModelHelper"],
	function (AppUtils, AbstractModel, AbstractModelHelper) {
		return AppUtils.getClass({
			extends: AbstractModel,
			constructor: function SearchByVersionsModel(AbstractModelHelper) {
				AbstractModel.call(this, AbstractModelHelper);
			},
			parameters: [
				[AbstractModelHelper]
			],
			functions: {
				onRefresh: function (callback) {
					this.getServices().getVersions().subscribe((data) => {
						this.data.list = data;
						callback();
					});
				},
				trackByLabel: function (index, item) {
					return item ? item.label : undefined;
				},
				getVersion: function (value) {
					let version = value;
					version = version.replace("0.00", "0");
					version = version.replace("0.0", "0");
					version = version.replace("0.", "0");
					return version.toLowerCase();
				},
				changeLogAvailable: function (value) {
					return (value.indexOf("u") === -1 && value.indexOf("b") === -1);
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