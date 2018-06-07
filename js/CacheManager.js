import AbstractManager from "./AbstractManager.js";

class CacheManager extends AbstractManager {
	constructor() {
		super();
		this._defaultNs = "build";
		this._applicationCachePrefix = "MSDB";
	}
	setDefaultNs(ns) {
		const lastNs = this._getDefaultNs();
		if (lastNs !== ns) {
			this.clear();
			this._setItem(this._defaultNs, ns);
		}
	}
	getItem(key, defaultValue) {
		return this._getItem(key, defaultValue);
	}
	setItem(key, value) {
		const oldValue = this.getItem(key);
		this._setItem(key, value);
		this.emit("change", {
			key: key,
			oldValue: oldValue,
			newValue: value
		});
	}
	clear() {
		localStorage.clear();
	}
	_getDefaultNs() {
		return this._getItem(this._defaultNs);
	}
	_getDefaultNsKey(key) {
		return this._getDefaultNs() + "_" + key;
	}
	_getApplicationKey(key) {
		return this._applicationCachePrefix + "_" + key;
	}
	_getItem(key, defaultValue) {
		let result = null;
		if (defaultValue === undefined) {
			defaultValue = null;
		}
		const calculatedKey = this._getApplicationKey(key);
		const value = localStorage.getItem(calculatedKey);
		try {
			result = JSON.parse(value)
		}
		catch (e) {
			/* dont't act */
		}
		return result || defaultValue;
	}
	_setItem(key, value) {
		const calculatedKey = this._getApplicationKey(key);
		localStorage.setItem(calculatedKey, JSON.stringify(value));
	}
}

export default CacheManager;