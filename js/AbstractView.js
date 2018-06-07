import AbstractComponent from "./AbstractComponent.js";

class AbstractView extends AbstractComponent {
	constructor(AbstractClassHelper, Model) {
		super(AbstractClassHelper);
		this.model = Model;
	}
	ngOnInit() {
		super.ngOnInit();
		this._activatedRouteQueryParamsSubscriber = this._helper.getActivatedRoute().queryParams.subscribe((params) => {
			this.model.init(params);
		});
	}
	ngOnDestroy() {
		super.ngOnDestroy();
		this.model.destroy();
		this.model = null;
		this._activatedRouteQueryParamsSubscriber.unsubscribe();
	}
}

export default AbstractView;