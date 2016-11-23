define(function() 
{
	const LOG_LEVEL_ALL = 7;
	const LOG_LEVEL_TRACE = 6;
	const LOG_LEVEL_DEBUG = 5;
	const LOG_LEVEL_INFO = 4;
	const LOG_LEVEL_WARN = 3;
	const LOG_LEVEL_ERROR = 2;
	const LOG_LEVEL_FATAL = 1;
	const LOG_LEVEL_OFF = 0;
	
	const getLevelByName = function(name)
	{
		let level = 0;
		switch(name)
		{
			case "all" : level = LOG_LEVEL_ALL; break;
			case "trace" : level = LOG_LEVEL_TRACE; break;
			case "debug" : level = LOG_LEVEL_DEBUG; break;
			case "info" : level = LOG_LEVEL_INFO; break;
			case "warn" : level = LOG_LEVEL_WARN; break;
			case "error" : level = LOG_LEVEL_ERROR; break;
			case "fatal" : level = LOG_LEVEL_FATAL; break;
			case "off" : level = LOG_LEVEL_OFF; break;
		}
		return level;
	};
	
	const logLevel = getLevelByName(GlobalConfig.logLevel);
	
	return {
		getLogger(className)
		{
			return {
				debug:function(message)
				{
					if(logLevel >= LOG_LEVEL_DEBUG)
					{
						console.debug(className, message);
					}
				},
				info:function(message)
				{
					if(logLevel >= LOG_LEVEL_INFO)
					{
						console.info(className, message);
					}
				},
				warn:function(message)
				{
					if(logLevel >= LOG_LEVEL_WARN)
					{
						console.warn(className, message);
					}
				}
			};
		}
	};			
});