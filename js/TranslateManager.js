import AbstractManager from "./AbstractManager.js";

class TranslateManager extends AbstractManager {
	static get parameters() {
		return this.getParameters(ng.common.http.HttpClient);
	}
	constructor(Http) {
		super();
		this._http = Http;
		this._properties = {};
		this._propertyFilePattern = null;
		this._loading = false;
		this._pendingRequests = [];
		this._currentLang = null;
	}
	init(params) {
		AbstractManager.prototype.init.call(this);
		this._propertyFilePattern = params.propertyFilePattern;
		this.setLanguage(params.language);
	}
	setLanguage(lang) {
		if (this._currentLang !== lang) {
			const oldValue = this._currentLang;
			this._currentLang = lang;
			this._loadProperties().subscribe(() => {
				this.emit("languageChange", {
					oldValue: oldValue,
					newValue: lang
				});
			});
		}
	}
	getCurrentLanguage() {
		return this._currentLang;
	}
	getValues(params) {
		const eventEmitter = new ng.core.EventEmitter();
		if (this._loading) {
			this._pendingRequests.push({
				params: params,
				eventEmitter: eventEmitter
			});
		}
		else {
			setTimeout(() => {
				eventEmitter.emit(this._getValues(params));
			}, 0);
		}
		return eventEmitter;
	}
	_getValues(params) {
		const values = {};
		params.forEach((param) => {
			if (typeof (param) === "object") {
				values[param.key] = this._getValue(param.key, param.properties);
			} else {
				values[param] = this._getValue(param);
			}
		});
		return values;
	}
	_getValue(key, properties) {
		let value = key;
		if (this._properties[this._currentLang] !== undefined) {
			if (this._properties[this._currentLang].hasOwnProperty(key)) {
				value = this._properties[this._currentLang][key];
			}
			if (Array.isArray(properties)) {
				properties.forEach((property, index) => {
					value = value.replace("{" + index + "}", property);
				});
			}
		}
		return value;
	}
	_checkPendingRequests() {
		this._pendingRequests.forEach((request) => {
			const values = this._getValues(request.params);
			request.eventEmitter.emit(values);
		});
		this._pendingRequests = [];
	}
	_loadProperties() {
		const eventEmitter = new ng.core.EventEmitter();
		if (!this._properties.hasOwnProperty(this._currentLang) && !this._loading) {
			this._loading = true;
			const path = this._propertyFilePattern.replace("{locale}", this._currentLang);
			this._http.get(path).subscribe((data) => {
				this._properties[this._currentLang] = data;
				this._loading = false;
				this._checkPendingRequests();
				eventEmitter.emit();
			});
		}
		else {
			setTimeout(() => {
				eventEmitter.emit();
			}, 0);
		}
		return eventEmitter;
	}
}

export default TranslateManager;