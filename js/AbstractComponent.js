import AbstractDirective from "./AbstractDirective.js";

class AbstractComponent extends AbstractDirective {
	static getAnnotations(params) {
		const defaultParams = {
			templateUrl: `html/${params.selector}-template.html`,
			styleUrls: [`css/${params.selector}-template.css`]
		};
		return [
			new ng.core.Component(Object.assign({}, defaultParams, params))
		];
	}
	constructor(AbstractClassHelper) {
		super(AbstractClassHelper);
	}
	ngAfterContentInit() {
		if (typeof this.afterContentInit === "function") {
			this.getLogger().debug("afterContentInit");
			this.afterContentInit();
		}
	}
	ngAfterContentChecked() {
		if (typeof this.afterContentChecked === "function") {
			this.getLogger().debug("afterContentChecked");
			this.afterContentChecked();
		}
	}
	ngAfterViewInit() {
		if (typeof this.afterViewInit === "function") {
			this.getLogger().debug("afterViewInit");
			this.afterViewInit();
		}
	}
	ngAfterViewChecked() {
		if (typeof this.afterViewChecked === "function") {
			this.getLogger().debug("afterViewChecked");
			this.afterViewChecked();
		}
	}
}

export default AbstractComponent;