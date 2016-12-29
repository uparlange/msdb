define(function() 
{
	const _LOG_LEVEL_ALL = 7;
	const _LOG_LEVEL_TRACE = 6;
	const _LOG_LEVEL_DEBUG = 5;
	const _LOG_LEVEL_INFO = 4;
	const _LOG_LEVEL_WARN = 3;
	const _LOG_LEVEL_ERROR = 2;
	const _LOG_LEVEL_FATAL = 1;
	const _LOG_LEVEL_OFF = 0;
	
	const getLevelByName = function(name)
	{
		let level = 0;
		switch(name)
		{
			case "all" : level = _LOG_LEVEL_ALL; break;
			case "trace" : level = _LOG_LEVEL_TRACE; break;
			case "debug" : level = _LOG_LEVEL_DEBUG; break;
			case "info" : level = _LOG_LEVEL_INFO; break;
			case "warn" : level = _LOG_LEVEL_WARN; break;
			case "error" : level = _LOG_LEVEL_ERROR; break;
			case "fatal" : level = _LOG_LEVEL_FATAL; break;
			case "off" : level = _LOG_LEVEL_OFF; break;
		}
		return level;
	};

	let _consoleWorker = null;
	
	const _level = getLevelByName(GlobalConfig.LOG_LEVEL);
	
	return {
		getLogger:function(className)
		{
			return {
				debug:function(message)
				{
					if(_level >= _LOG_LEVEL_DEBUG)
					{
						this._log("debug", message);
					}
				},
				info:function(message)
				{
					if(_level >= _LOG_LEVEL_INFO)
					{
						this._log("info", message);
					}
				},
				warn:function(message)
				{
					if(_level >= _LOG_LEVEL_WARN)
					{
						this._log("warn", message);
					}
				},
				error:function(message)
				{
					if(_level >= _LOG_LEVEL_ERROR)
					{
						this._log("error", message);
					}
				},
				_log:function(methodName, message)
				{
					if (Worker) 
					{
						if(_consoleWorker === null)
						{
							_consoleWorker = new Worker("js/LogWorker.js");
						}
						const params = {
							methodName:methodName,
							className:className,
							message:message
						};
						_consoleWorker.postMessage([params]);
					}
					else
					{
						console[methodName](className, message);
					}
				}
			};
		}
	};		
});