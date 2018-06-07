import AbstractComponent from "./AbstractComponent.js";

class AbstractPopup extends AbstractComponent {
	constructor(AbstractClassHelper, Model) {
		super(AbstractClassHelper);
		this._afterOpenSubscriber = null;
		this._beforeCloseSubscriber = null;
		this.model = Model;
	}
	ngOnInit() {
		super.ngOnInit();
		this._afterOpenSubscriber = this._helper.getPopups().on("afterOpen").subscribe(() => {
			if (typeof this.afterOpen === "function") {
				this.afterOpen();
			}
		});
		this._beforeCloseSubscriber = this._helper.getPopups().on("beforeClose").subscribe(() => {
			if (typeof this.beforeClose === "function") {
				this.beforeClose();
			}
		});
	}
	ngOnDestroy() {
		super.ngOnDestroy();
		this._afterOpenSubscriber.unsubscribe();
		this._beforeCloseSubscriber.unsubscribe();
		this.model = null;
	}
	close() {
		this._helper.getPopups().closeActive();
	}
}

export default AbstractPopup;