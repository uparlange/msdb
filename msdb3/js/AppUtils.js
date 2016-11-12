define(function () 
{
    return {
		getComponentConfiguration:function(componentName, params)
		{
			const defaultParams = {
				selector: componentName,
				templateUrl: "html/" + componentName + "-component" + ".html",
				styleUrls: ["css/" + componentName + "-component.css"]
			};
			return Object.assign({}, defaultParams, params);
		},
		getEncodedValue:function(value)
		{
			return encodeURIComponent(value);
		},
		getDecodedValue:function(value)
		{
			return decodeURIComponent(value);
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
		loadModule:function(moduleName)
		{
			return System.import("app:" + moduleName);
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
			//return "http://localhost/projects/msdb2/dist";
			//return "http://192.168.15.1/projects/msdb2/dist";
			return "";
		}
	};
});