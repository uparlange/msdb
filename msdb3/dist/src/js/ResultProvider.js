"use strict";define(["MsdbProvider","AppUtils"],function(a,b){return ng.core.Class({constructor:[a,function(a){this._msdbProvider=a,this._params={},this.data=this._getInitData()}],init:function(a){var b=this;this._params.type===a.type&&this._params.value===a.value||(this.data=this._getInitData(),this._msdbProvider.search(a.type,a.value).subscribe(function(c){b.data=c,b._params=a}))},getIconUrl:function(a){return b.getIconUrl(a)},_getInitData:function(){return[]}})});