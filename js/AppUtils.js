define(function () {
	return {
		getClass: function (conf) {
			const c = conf.constructor;
			if (conf.extends) {
				c.prototype = Object.create(conf.extends.prototype);
				c.prototype.constructor = c;
			}
			if (conf.annotations) {
				c.annotations = conf.annotations;
			}
			if (conf.parameters) {
				c.parameters = conf.parameters;
			}
			if (conf.functions) {
				for (var fname in conf.functions) {
					c.prototype[fname] = conf.functions[fname];
				}
			}
			return c;
		},
		getLazyModuleClass: function (conf) {
			return {
				module: this.getClass(conf)
			};
		},
		getLazyModuleName: function (moduleName) {
			return moduleName + "#module";
		},
		getComponentConfiguration: function (componentName, params) {
			const defaultParams = {
				selector: componentName,
				templateUrl: "html/" + componentName + "-template.html",
				styleUrls: ["css/" + componentName + "-template.css"]
			};
			return Object.assign({}, defaultParams, params);
		},
		getGameIconUrl: function (game) {
			return (game.icon !== null ? this.getGameFolder(game) + "/" + game.icon.name : "images/mame_joy_32px.png");
		},
		getGameVideoUrl: function (game) {
			return "http://www.progettosnaps.net/videosnaps/mp4/" + game.name + ".mp4";
		},
		getGameManualUrl: function (game) {
			return "http://www.progettosnaps.net/manuals/pdf/" + game.name + ".pdf";
		},
		getGameSoundTrackUrl: function (game) {
			return "http://www.progettosnaps.net/soundtrack/packs/mp3/" + game.name + ".zip";
		},
		getGameFolder: function (game) {
			return this._getBaseClientUrl() + "games/" + game.name;
		},
		getServiceUrl: function (serviceName) {
			return this._getBaseClientUrl() + "php/services/" + serviceName + ".php";
		},
		runInNw: function () {
			return window.hasOwnProperty("nw");
		},
		getSocketPort: function () {
			return 3000;
		},
		getSocketUrl: function () {
			return this._getBaseServerUrl() + ":" + this.getSocketPort();
		},
		_getBaseServerUrl: function () {
			return "http://localhost";
		},
		_getBaseClientUrl: function () {
			let path = "";
			if (!GlobalConfig.PRODUCTION || this.runInNw()) {
				path = "https://msdb.lapli.fr/";
			}
			return path;
			//return "http://localhost/msdb2/dist/";
		}
	};
});