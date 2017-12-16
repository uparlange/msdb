define(["AppUtils", "AbstractModule"],
	function (AppUtils, AbstractModule) {
		return AppUtils.getClass({
			extends: AbstractModule,
			constructor: function MaterialModule() {
				AbstractModule.call(this);
			},
			annotations: [
				new ng.core.NgModule({
					imports: [
						ng.material.MatToolbarModule,
						ng.material.MatSnackBarModule,
						ng.material.MatProgressBarModule,
						ng.material.MatCardModule,
						ng.material.MatButtonModule,
						ng.material.MatCheckboxModule,
						ng.material.MatDialogModule,
						ng.material.MatFormFieldModule,
						ng.material.MatTableModule,
						ng.material.MatTabsModule,
						ng.material.MatInputModule,
						ng.material.MatListModule,
						ng.material.MatMenuModule,
						ng.material.MatExpansionModule
					],
					exports: [
						ng.material.MatToolbarModule,
						ng.material.MatSnackBarModule,
						ng.material.MatProgressBarModule,
						ng.material.MatButtonModule,
						ng.material.MatCardModule,
						ng.material.MatCheckboxModule,
						ng.material.MatDialogModule,
						ng.material.MatFormFieldModule,
						ng.material.MatTableModule,
						ng.material.MatTabsModule,
						ng.material.MatInputModule,
						ng.material.MatListModule,
						ng.material.MatMenuModule,
						ng.material.MatExpansionModule
					]
				})
			]
		});
	}
);