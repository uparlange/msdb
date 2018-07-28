onmessage = function (e) {
	const params = e.data[0];
	const appender = console;
	appender[params.methodName](params.className, params.message);
};