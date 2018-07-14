import AbstractManager from "./AbstractManager.js";

class CacheManager extends AbstractManager {
	constructor() {
		super();
	}
	setItem(namespace, key, newValue) {
		const oldValue = this.getItem(namespace, key);
		if (oldValue != newValue) {
			const calculatedKey = this._getCalculatedKey(namespace, key);
			localStorage.setItem(calculatedKey, JSON.stringify(newValue));
			this.emit("change", {
				namespace: namespace,
				key: key,
				oldValue: oldValue,
				newValue: newValue
			});
		}
	}
	getItem(namespace, key, defaultValue) {
		const calculatedKey = this._getCalculatedKey(namespace, key);
		let result = null;
		if (defaultValue === undefined) {
			defaultValue = null;
		}
		const value = localStorage.getItem(calculatedKey);
		try {
			result = JSON.parse(value)
		}
		catch (e) {
			/* dont't act */
		}
		return result || defaultValue;
	}
	setNsValue(namespace, newValue) {
		const oldValue = this.getItem(namespace, "value");
		if (oldValue != newValue) {
			this.clearNs(namespace);
			this.setItem(namespace, "value", newValue);
		}
	}
	clearNs(namespace) {
		const prefix = (namespace);
		for (var key in window.localStorage) {
			if (key.indexOf(prefix)) {
				localStorage.removeItem(key);
			}
		}
	}
	clearAll() {
		localStorage.clear();
	}
	_getNsPrefix(namespace) {
		return `${namespace}_`;
	}
	_getCalculatedKey(namespace, key) {
		return `${this._getNsPrefix(namespace)}${key}`;
	}
}

export default CacheManager;