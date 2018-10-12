import AbstractManager from "./AbstractManager.js";

class CacheManager extends AbstractManager {
	constructor() {
		super();
		this._db = new Dexie("MSDB");
		this._db.version(1).stores({
			properties: "key, namespace"
		});
	}
	setItem(key, newValue, namespace) {
		const eventEmitter = new ng.core.EventEmitter();
		this.getItem(key).subscribe((oldValue) => {
			this._db.properties.put({ key: key, value: newValue, namespace: (namespace || "default") });
			const change = {
				key: key,
				oldValue: oldValue,
				newValue: newValue
			};
			this.emit("change", change);
			eventEmitter.emit(change);
		});
		return eventEmitter;
	}
	getItem(key, defaultValue) {
		const eventEmitter = new ng.core.EventEmitter();
		this._db.properties.get({ key: key }).then((property) => {
			let value = null;
			if (property != undefined) {
				value = property.value;
			} else if (defaultValue != undefined) {
				value = defaultValue;
			}
			eventEmitter.emit(value);
		});
		return eventEmitter;
	}
	deleteNamespace(namespace) {
		this._db.properties.where("namespace").equals(namespace).delete().then((deleteCount) => {
			this.getLogger().debug("Deleted " + deleteCount + " objects from cache");
		});
	}
}

export default CacheManager;