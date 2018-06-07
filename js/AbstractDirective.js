import AbstractClass from "./AbstractClass.js";

class AbstractDirective extends AbstractClass {
	static getAnnotations(params) {
		return [
			new ng.core.Directive(params)
		];
	}
	constructor(AbstractClassHelper) {
		super();
		this._helper = AbstractClassHelper;
	}
	ngOnChanges(event) {
		if (typeof this.onChanges === "function") {
			this.onChanges(event);
		}
	}
	ngOnInit() {
		if (typeof this.onInit === "function") {
			this.getLogger().debug("onInit");
			this.onInit();
		}
	}
	ngDoCheck() {
		if (typeof this.doCheck === "function") {
			this.getLogger().debug("doCheck");
			this.doCheck();
		}
	}
	ngOnDestroy() {
		if (typeof this.onDestroy === "function") {
			this.getLogger().debug("onDestroy");
			this.onDestroy();
		}
		else {
			this.getLogger().warn("onDestroy?");
		}
		this._helper = null;
	}
	getRouter() {
		return this._helper.getRouter();
	}
	getConnection() {
		return this._helper.getConnection();
	}
	getLabels() {
		return this._helper.getLabels();
	}
	getLazy() {
		return this._helper.getLazy();
	}
	getWindowRef() {
		return this._helper.getWindowRef();
	}
	getEventBus() {
		return this._helper.getEventBus();
	}
	getPopups() {
		return this._helper.getPopups();
	}
}

export default AbstractDirective;