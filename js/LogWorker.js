onmessage = function(e) 
{
	const methodName = e.data[0];
	const className = e.data[1];
	const message = e.data[2];
	
	console[methodName](className, message);
}