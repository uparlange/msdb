export default {
	getParameters: function () {
		const argumentsCount = arguments.length;
		if (argumentsCount > 0) {
			const params = [];
			for (let i = 0; i < argumentsCount; i++) {
				params.push([arguments[i]]);
			}
			return params;
		} else {
			return undefined;
		}
	},
	getGameIconUrl: function (game) {
		return game.icon !== null ? `${this.getGameFolder(game)}/${game.icon.name}` : "images/game.png";
	},
	getGameVideoUrl: function (game) {
		return `http://www.progettosnaps.net/videosnaps/mp4/${game.name}.mp4`;
	},
	getGameManualUrl: function (game) {
		return `http://www.progettosnaps.net/manuals/pdf/${game.name}.pdf`;
	},
	getGameSoundTrackUrl: function (game) {
		return `http://www.progettosnaps.net/soundtrack/packs/mp3/${game.name}.zip`;
	},
	getGameFolder: function (game) {
		return `${this._getBaseClientUrl()}games/${game.name}`;
	},
	getServiceUrl: function (serviceName) {
		return `${this._getBaseClientUrl()}php/services/${serviceName}.php`;
	},
	runInNw: function () {
		return window.hasOwnProperty("nw");
	},
	getSocketPort: function () {
		return 3000;
	},
	getSocketUrl: function () {
		return `${this._getBaseServerUrl()}:${this.getSocketPort()}`;
	},
	productionMode: function () {
		return window.location.href.indexOf(this._getBaseServerUrl()) === -1;
	},
	getLogLevel: function () {
		return this.productionMode() ? "error" : "all";
	},
	getHttpRequestTimeOut: function () {
		return 10000;
	},
	import: function (modulePath) {
		const eventEmitter = new ng.core.EventEmitter();
		/*
		if (this._supportDynamicImport()) {
			import(modulePath).then((module) => {
				eventEmitter.emit(module.default);
			});
		} else {
		*/
		// https://github.com/uupaa/dynamic-import-polyfill
		const vector = "$importModule$" + Math.random().toString(32).slice(2);
		const script = document.createElement("script");
		const destructor = () => {
			delete window[vector];
			script.onerror = null;
			script.onload = null;
			script.remove();
			URL.revokeObjectURL(script.src);
			script.src = "";
		};
		script.defer = "defer";
		script.type = "module";
		script.onload = () => {
			eventEmitter.emit(window[vector].default);
			destructor();
		};
		const a = document.createElement("a");
		a.setAttribute("href", modulePath);
		const absURL = a.cloneNode(false).href;
		const loader = `import * as m from "${absURL}"; window.${vector} = m;`;
		const blob = new Blob([loader], { type: "text/javascript" });
		script.src = URL.createObjectURL(blob);
		document.head.appendChild(script);
		//}
		return eventEmitter;
	},
	_supportDynamicImport() {
		try {
			new Function('import("")');
			return true;
		} catch (err) {
			return false;
		}
	},
	_getBaseServerUrl: function () {
		return "http://localhost";
	},
	_getBaseClientUrl: function () {
		let path = "";
		if (!this.productionMode() || this.runInNw()) {
			path = "https://msdb.lapli.fr/";
		}
		return path;
		//return "http://localhost/msdb2/dist/";
	}
};