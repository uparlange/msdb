import AppUtils from "./AppUtils.js";
import AbstractComponent from "./AbstractComponent.js";

export default AppUtils.getClass({
	extends: AbstractComponent,
	constructor: function AbstractView(AbstractClassHelper, Model) {
		AbstractComponent.call(this, AbstractClassHelper);
		this.model = Model;
	},
	functions: {
		ngOnInit: function () {
			AbstractComponent.prototype.ngOnInit.call(this);
			this._activatedRouteQueryParamsSubscriber = this._helper.getActivatedRoute().queryParams.subscribe((params) => {
				this.model.init(params);
			});
		},
		ngOnDestroy: function () {
			AbstractComponent.prototype.ngOnDestroy.call(this);
			this.model.destroy();
			this.model = null;
			this._activatedRouteQueryParamsSubscriber.unsubscribe();
		}
	}
});