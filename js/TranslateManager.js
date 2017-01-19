define(["app:AbstractManager"],
function (AbstractManager) 
{
	return ng.core.Class({
		extends:AbstractManager,
        constructor: [ng.http.Http, 
			function TranslateManager (Http)
			{
				AbstractManager.call(this);
				
				this._http = Http;
				
				this.onLanguageChange = new ng.core.EventEmitter();

				this._properties = {};
				
				this._loading = false;
				this._pendingRequests = [];
				
				this.setLanguage(this._getDefaultLanguage());
			}
		],
		setLanguage:function(lang)
		{
			if(this._currentLang !== lang)
			{
				this._currentLang = lang;

				this._loadProperties().subscribe(() => 
				{
					this.onLanguageChange.emit();
				});
			}
		},
		getCurrentLanguage:function()
		{
			return this._currentLang;
		},
        getValues: function (params)
        {
            const eventEmitter = new ng.core.EventEmitter();
			
			if(this._loading)
			{
				this._pendingRequests.push({
					params:params,
					eventEmitter:eventEmitter
				});
			}
			else
			{
				setTimeout(() =>
				{
					eventEmitter.emit(this._getValues(params));
				},0);
			}

            return eventEmitter;
        },
		_getDefaultLanguage:function()
		{
			const navigatorLang = navigator.language.split("-")[0];
			return /(fr|en)/gi.test(navigatorLang) ? navigatorLang : "en";
		},
        _getValues: function (params)
        {
			const values = {};
			params.forEach((element) => 
			{
                values[element] = this._getValue(element);
            });
            return values;
        },
        _getValue: function (param)
        {
			if(this._properties[this._currentLang].hasOwnProperty(param))
            {
                return this._properties[this._currentLang][param];
            }
            return param;
        },
		_checkPendingRequests:function()
		{
			this._pendingRequests.forEach((request) => 
			{
				const values = this._getValues(request.params);
				request.eventEmitter.emit(values);
			});
			this._pendingRequests = [];
		},
        _loadProperties: function()
        {
            const eventEmitter = new ng.core.EventEmitter();
			
			if(!this._properties.hasOwnProperty(this._currentLang) && !this._loading)
			{
				this._loading = true;

				this._http.get("data/" + this._currentLang + ".json").subscribe((data) => 
				{
					this._properties[this._currentLang] = data.json();
					
					this._loading = false;
					
					this._checkPendingRequests();

					eventEmitter.emit();
				});
			}
			else
			{
				setTimeout(() =>
                {
                    eventEmitter.emit();
                }, 0);
			}
			
			return eventEmitter;
        }
    });
});