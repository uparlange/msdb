define(["AbstractDirective", "AbstractClassHelper", "AppUtils"],
	function (AbstractDirective, AbstractClassHelper, AppUtils) {
		return AppUtils.getClass({
			extends: AbstractDirective,
			constructor: function HrefDirective(AbstractClassHelper) {
				AbstractDirective.call(this, AbstractClassHelper);
			},
			parameters: [
				[AbstractClassHelper]
			],
			annotations: [
				new ng.core.Directive({
					selector: "[href]",
					host: {
						"(click)": "onClick($event)"
					}
				})
			],
			functions: {
				onClick: function () {
					this.getRouter().saveCurrentViewScrollPosition();
				}
			}
		});
	}
);