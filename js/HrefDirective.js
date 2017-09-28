define(["AbstractDirective", "RouterManager", "AppUtils"],
	function (AbstractDirective, RouterManager, AppUtils) {
		return AppUtils.getClass({
			extends: AbstractDirective,
			constructor: function HrefDirective(RouterManager) {
				AbstractDirective.call(this);
				this._routerManager = RouterManager;
			},
			parameters: [
				[RouterManager]
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
					this._routerManager.saveCurrentViewScrollPosition();
				}
			}
		});
	}
);