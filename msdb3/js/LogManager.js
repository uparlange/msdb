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
	
	const logLevel = LOG_LEVEL_ALL;
	
	const debugEnabled = true;
	
	return {
		getLogger(className)
		{
			return {
				debug:function(message)
				{
					if(debugEnabled && logLevel >= LOG_LEVEL_DEBUG)
					{
						console.debug(className, message);
					}
				},
				info:function(message)
				{
					if(debugEnabled && logLevel >= LOG_LEVEL_INFO)
					{
						console.info(className, message);
					}
				},
				warn:function(message)
				{
					if(debugEnabled && logLevel >= LOG_LEVEL_WARN)
					{
						console.warn(className, message);
					}
				}
			};
		}
	};			
});