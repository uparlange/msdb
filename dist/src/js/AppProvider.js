"use strict";define(["TranslateManager"],function(a){return ng.core.Class({constructor:[a,function(a){this._translateManager=a,this.data=this._getInitData(),this._onLanguageChangeSubscriber=null}],init:function(){var a=this;null===this.data.lang&&(this.data.lang=this._translateManager.getCurrentLanguage(),this._onLanguageChangeSubscriber=this._translateManager.onLanguageChange.subscribe(function(){a.data.lang=a._translateManager.getCurrentLanguage()}))},toggleLanguage:function(){this._translateManager.setLanguage("fr"===this.data.lang?"en":"fr")},_getInitData:function(){return{lang:null}}})});