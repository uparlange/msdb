window.GlobalConfig = {};
if (window.location.search.indexOf("debug") === -1) {
	GlobalConfig.PRODUCTION = true;
	GlobalConfig.LOG_LEVEL = "error";
}
else {
	GlobalConfig.PRODUCTION = false;
	GlobalConfig.LOG_LEVEL = "all";
}
GlobalConfig.HTTP_REQUEST_TIMEOUT = 30000;