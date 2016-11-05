define(function () 
{
    return {
		getEncodedValue:function(value)
		{
			return encodeURIComponent(value);
		},
		getDecodedValue:function(value)
		{
			return decodeURIComponent(value);
		},
		getTemplateUrl:function(componentName)
		{
			return this.getHtmlUrl(componentName + "-component");
		},
		getHtmlUrl:function(pageName)
		{
			return "html/" + pageName + ".html";
		},
		getStyleUrls:function(componentName)
		{
			return ["css/" + componentName + "-component.css"];
		},
		getSizeLabel: function (value)
  		{   
			let lbl = value + " Octet(s)";
			if (value >= 1073741824)
			{
				lbl = (Math.round(value / 1073741824 * 100) / 100) + " Go";
			}
			else if (value >= 1048576)
			{
				lbl = (Math.round(value / 1048576 * 100) / 100) + " Mo";
			}
			else if (value >= 1024)
			{
				lbl = (Math.round(value / 1024 * 100) / 100) + " Ko";
			}
			return lbl;
  		},   
		getFrequencyLabel: function (value)
		{
			let lbl = value + " Hz";
			if (value >= 1000000000)
			{
				lbl = (Math.round(value / 1073741824 * 100) / 100) + " GHz";
			}
			else if (value >= 1000000)
			{
				lbl = (Math.round(value / 1048576 * 100) / 100) + " MHz";
			}
			return lbl;
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
		_getBaseUrl:function()
		{
			//return "http://localhost/projects/msdb2/dist";
			//return "http://192.168.0.15/projects/msdb2/dist";
			return "";
		}
	};
});