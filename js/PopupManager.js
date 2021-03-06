import AbstractManager from "./AbstractManager.js";

class PopupManager extends AbstractManager {
	constructor() {
		super();
		this._matDialogRef = null;
		this._afterOpenSubscriber = null;
		this._beforeCloseSubscriber = null;
		this._afterClosedSubscriber = null;
	}
	open(matDialog, clazz, config) {
		this._matDialogRef = matDialog.open(clazz, config);
		this._afterOpenSubscriber = this._matDialogRef.afterOpen().subscribe(() => {
			this.emit("afterOpen");
		});
		this._beforeCloseSubscriber = this._matDialogRef.beforeClose().subscribe(() => {
			this.emit("beforeClose");
		});
		this._afterClosedSubscriber = this._matDialogRef.afterClosed().subscribe(() => {
			this._afterOpenSubscriber.unsubscribe();
			this._beforeCloseSubscriber.unsubscribe();
			this._afterClosedSubscriber.unsubscribe();
			this._matDialogRef = null;
		});
	}
	closeActive() {
		if (this._matDialogRef != null) {
			this._matDialogRef.close();
		}
	}
}

export default PopupManager;