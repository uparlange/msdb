define(["app:AbstractManager"],
function (AbstractManager) 
{
	const CacheManager = function ()
	{
		AbstractManager.call(this);
		
		this._defaultNs = "build";
		
		this._applicationCachePrefix = "MSDB";
	};
	
	return ng.core.Class({
		extends:AbstractManager,
		constructor:CacheManager,
		setDefaultNs:function(ns)
		{
			const lastNs = this._getDefaultNs();
			if(lastNs !== ns)
			{
				this._clear();
				this._setItem(this._defaultNs, ns);
			}
		},
		getItem:function(key, defaultValue)
		{
			return this._getItem(key, defaultValue);
		},
		setItem:function(key, value)
		{
			this._setItem(key, value);
		},
		_getDefaultNs:function(key)
		{
			return this._getItem(this._defaultNs);
		},
		_getDefaultNsKey:function(key)
		{
			return this._getDefaultNs() + "_" + key;
		},
		_getApplicationKey:function(key)
		{
			return this._applicationCachePrefix + "_" + key;
		},
		_getItem:function(key, defaultValue)
		{
			if(defaultValue === undefined)
			{
				defaultValue = null;
			}
			const calculatedKey = this._getApplicationKey(key);
			const value = localStorage.getItem(calculatedKey);
			return JSON.parse(value || defaultValue);
		},
		_setItem:function(key, value)
		{
			const calculatedKey = this._getApplicationKey(key);
			localStorage.setItem(calculatedKey, JSON.stringify(value));
		},
		_clear:function()
		{
			localStorage.clear();
		}
	});			
});