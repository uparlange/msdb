import AbstractPipe from "./AbstractPipe.js";
import AbstractClassHelper from "./AbstractClassHelper.js";

class TranslatePipe extends AbstractPipe {
	static get annotations() {
		return this.getAnnotations({
			name: "translate",
			pure: false
		});
	}
	static get parameters() {
		return this.getParameters(AbstractClassHelper);
	}
	constructor(AbstractClassHelper) {
		super(AbstractClassHelper);
		this._tranlateKey = null;
		this._translateParams = null;
		this._tranlateValue = null;
		this._onLanguageChangeSubscriber = this.getLabels().on("languageChange").subscribe(() => {
			this._refreshTranslation();
		});
	}
	transform() {
		const args = Array.from(arguments);
		const value = args.shift();
		const params = args.join(",");
		if (this._tranlateKey !== value || this._translateParams !== params) {
			this._tranlateKey = value;
			this._translateParams = params;
			this._refreshTranslation();
		}
		return this._tranlateValue;
	}
	onDestroy() {
		this._onLanguageChangeSubscriber.unsubscribe();
	}
	_refreshTranslation() {
		let param = this._tranlateKey;
		if (this._translateParams != null) {
			param = {
				key: this._tranlateKey,
				properties: this._translateParams.toString().split(",")
			};
		}
		this.getLabels().getValues([param]).subscribe((translations) => {
			this._tranlateValue = translations[this._tranlateKey];
		});
	}
}

export default TranslatePipe;