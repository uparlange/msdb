define(["AppUtils", "AbstractClass"],
	function (AppUtils, AbstractClass) {
		return AppUtils.getClass({
			extends: AbstractClass,
			constructor: function AbstractDirective() {
				AbstractClass.call(this);
			},
			functions: {
				ngOnChanges: function (event) {
					if (typeof this.onChanges === "function") {
						this.onChanges(event);
					}
				},
				ngOnInit: function () {
					if (typeof this.onInit === "function") {
						this.getLogger().debug("onInit");
						this.onInit();
					}
				},
				ngDoCheck: function () {
					if (typeof this.doCheck === "function") {
						this.getLogger().debug("doCheck");
						this.doCheck();
					}
				},
				ngOnDestroy: function () {
					if (typeof this.onDestroy === "function") {
						this.getLogger().debug("onDestroy");
						this.onDestroy();
					}
					else {
						this.getLogger().warn("onDestroy?");
					}
				}
			}
		});
	}
);