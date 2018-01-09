define(["AppUtils", "AbstractClass"],
	function (AppUtils, AbstractClass) {
		return AppUtils.getClass({
			extends: AbstractClass,
			constructor: function AbstractDirective(AbstractClassHelper) {
				AbstractClass.call(this);
				this._helper = AbstractClassHelper;
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
					this._helper = null;
				},
				getRouter: function () {
					return this._helper.getRouter();
				},
				getConnection: function () {
					return this._helper.getConnection();
				},
				getLabels: function () {
					return this._helper.getLabels();
				},
				getLazy: function () {
					return this._helper.getLazy();
				},
				getWindowRef: function () {
					return this._helper.getWindowRef();
				},
				getEventBus: function () {
					return this._helper.getEventBus();
				},
				getPopups: function () {
					return this._helper.getPopups();
				}
			}
		});
	}
);