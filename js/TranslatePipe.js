define(["AppUtils", "AbstractPipe", "AbstractClassHelper"],
	function (AppUtils, AbstractPipe, AbstractClassHelper) {
		return AppUtils.getClass({
			extends: AbstractPipe,
			constructor: function TranslatePipe(AbstractClassHelper) {
				AbstractPipe.call(this, AbstractClassHelper);
				this._tranlateKey = null;
				this._translateParams = null;
				this._tranlateValue = null;
				this._onLanguageChangeSubscriber = this.getLabels().onLanguageChange.subscribe(() => {
					this._refreshTranslation();
				});
			},
			annotations: [
				new ng.core.Pipe({
					name: "translate",
					pure: false
				})
			],
			parameters: [
				[AbstractClassHelper]
			],
			functions: {
				transform: function () {
					const args = Array.from(arguments);
					const value = args.shift();
					const params = args.join(",");
					if (this._tranlateKey !== value || this._translateParams !== params) {
						this._tranlateKey = value;
						this._translateParams = params;
						this._refreshTranslation();
					}
					return this._tranlateValue;
				},
				ngOnDestroy: function () {
					this._onLanguageChangeSubscriber.unsubscribe();
				},
				_refreshTranslation: function () {
					let param = this._tranlateKey;
					if (this._translateParams != null) {
						param = {
							key: this._tranlateKey,
							properties: this._translateParams.toString().split(",")
						};
					}
					this.getLabels().getValues([param]).subscribe((translations) => {
						this._tranlateValue = translations[this._tranlateKey];
					});
				}
			}
		});
	});