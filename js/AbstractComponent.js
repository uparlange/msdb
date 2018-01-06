define(["AppUtils", "AbstractDirective"],
	function (AppUtils, AbstractDirective) {
		return AppUtils.getClass({
			extends: AbstractDirective,
			constructor: function AbstractComponent(AbstractClassHelper) {
				AbstractDirective.call(this, AbstractClassHelper);
			},
			functions: {
				ngAfterContentInit: function () {
					if (typeof this.afterContentInit === "function") {
						this.getLogger().debug("afterContentInit");
						this.afterContentInit();
					}
				},
				ngAfterContentChecked: function () {
					if (typeof this.afterContentChecked === "function") {
						this.getLogger().debug("afterContentChecked");
						this.afterContentChecked();
					}
				},
				ngAfterViewInit: function () {
					if (typeof this.afterViewInit === "function") {
						this.getLogger().debug("afterViewInit");
						this.afterViewInit();
					}
				},
				ngAfterViewChecked: function () {
					if (typeof this.afterViewChecked === "function") {
						this.getLogger().debug("afterViewChecked");
						this.afterViewChecked();
					}
				}
			}
		});
	}
);