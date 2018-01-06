define(["AppUtils", "AbstractClass"],
	function (AppUtils, AbstractClass) {
		return AppUtils.getClass({
			extends: AbstractClass,
			constructor: function AbstractPipe(AbstractClassHelper) {
				AbstractClass.call(this);
				this._helper = AbstractClassHelper;
			},
			functions: {
				ngOnDestroy: function () {
					if (typeof this.onDestroy === "function") {
						this.getLogger().debug("onDestroy");
						this.onDestroy();
					}
					else {
						this.getLogger().warn("onDestroy?");
					}
					this._helper = null;
				},
				getLabels: function () {
					return this._helper.getLabels();
				}
			}
		});
	}
);