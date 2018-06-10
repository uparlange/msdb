import AbstractModule from "./AbstractModule.js";

class MaterialModule extends AbstractModule {
	static get annotations() {
		return this.getAnnotations({
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
				ng.material.MatExpansionModule,
				ng.material.MatTooltipModule,
				ng.material.MatSelectModule,
				ng.material.MatPaginatorModule
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
				ng.material.MatExpansionModule,
				ng.material.MatTooltipModule,
				ng.material.MatSelectModule,
				ng.material.MatPaginatorModule
			]
		});
	}
	constructor() {
		super();
	}
}

export default MaterialModule;