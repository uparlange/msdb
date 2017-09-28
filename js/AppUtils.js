define(function () {
	return {
		_md: new MobileDetect(navigator.userAgent),
		getDevice: function () {
			return this._md;
		},
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
				for(var fname in conf.functions) {
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
		getSizeLabel: function (value) {
			return this._getUnitLabel(value, ["B", "KiB", "MiB", "GiB"], 1024);
		},
		getFrequencyLabel: function (value) {
			return this._getUnitLabel(value, ["Hz", "kHz", "MHz", "GHz"], 1000);
		},
		getGameIconUrl: function (game) {
			return (game.icon !== null ? this.getGameFolder(game) + "/" + game.icon.name : "images/mame_joy_32px.png");
		},
		getGameFolder: function (game) {
			return this._getBaseClientUrl() + "games/" + game.name;
		},
		getGameVideoUrl: function (game) {
			return (game.name !== undefined) ? "http://adb.arcadeitalia.net/download_file.php?tipo=mame_current&codice=" + game.name + "&entity=shortplay&oper=streaming&filler=" + game.name + ".mp4" : null;
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
		_getUnitLabel: function (value, steps, stepMultiplier) {
			let step = null;
			steps.forEach((item, index) => {
				const stepValue = Math.pow(stepMultiplier, index);
				if (value >= stepValue) {
					step = { unit: item, value: stepValue };
				}
				else {
					return;
				}
			});
			return (Math.round(value / step.value * 100) / 100) + " " + step.unit;
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
			/* return "http://localhost/msdb2/dist/"; */
		}
	};
});