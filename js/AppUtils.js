define(function () 
{
    return {
		_md : new MobileDetect(window.navigator.userAgent),
		getDevice:function()
		{
			return this._md;
		},
		getComponentConfiguration:function(componentName, params)
		{
			const defaultParams = {
				selector: componentName,
				templateUrl: "html/" + componentName + "-template" + ".html",
				styleUrls: ["css/" + componentName + "-template.css"]
			};
			return Object.assign({}, defaultParams, params);
		},
		getSizeLabel: function (value)
  		{
			return this._getUnitLabel(value, ["B", "KiB", "MiB", "GiB"], 1024);
  		},   
		getFrequencyLabel: function (value)
		{
			return this._getUnitLabel(value, ["Hz", "kHz", "MHz", "GHz"], 1000);
		},
		getGameIconUrl:function(game)
		{
			return (game.icon !== null ? this.getGameFolder(game) + "/" + game.icon.name : "images/mame_joy_32px.png");
		},
		getGameFolder:function(game)
		{
			return this._getBaseUrl() + "/games/" + game.name;
		},
		getGameVideoUrl:function(game)
		{
			return (game.name !== undefined) ? "http://adb.arcadeitalia.net/download_file.php?tipo=mame_current&codice=" + game.name + "&entity=shortplay&oper=streaming&filler=" + game.name + ".mp4" : null;    
		},
		getServiceUrl:function(serviceName)
		{
			return this._getBaseUrl() + "/php/services/" + serviceName + ".php";
		},
		getModuleName:function(moduleName)
		{
			return "app:" + moduleName + "#module";
		},
		_getUnitLabel:function(value, steps, stepMultiplier)
		{
			let step = null;
			steps.forEach((item, index, array) =>
			{
				const stepValue = Math.pow(stepMultiplier, index);
				if(value >= stepValue)
				{
					step = {unit:item,value:stepValue};
				}
				else
				{
					return;
				}
			});
			return (Math.round(value / step.value * 100) / 100) + " " + step.unit;
		},
		_getBaseUrl:function()
		{
			let path = window.location.protocol + "//" + window.location.host + window.location.pathname;
			if(!GlobalConfig.prod)
			{
				path = path.replace("msdb3", "msdb2");
				if(path.indexOf("dist") === -1)
				{
					path += "dist";
				}
			}
			return path;
		}
	};
});