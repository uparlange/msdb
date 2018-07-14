import AbstractComponent from "./AbstractComponent.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import AppUtils from "./AppUtils.js";

class MdiIconComponent extends AbstractComponent {
    static get annotations() {
        return this.getAnnotations({
            selector: "mdi-icon",
            inputs: ["name", "size"]
        });
    }
    static get parameters() {
        return AppUtils.getParameters(AbstractClassHelper, ng.core.ElementRef);
    }
    constructor(AbstractClassHelper, ElementRef) {
        super(AbstractClassHelper);
        this._element = ElementRef.nativeElement;
        this.name = "help";
        this.size = 24;
    }
    afterContentInit() {
        this._refresh();
    }
    onChanges() {
        this._refresh();
    }
    _refresh() {
        const iconElement = this._element.getElementsByTagName("i")[0];
        iconElement.style.lineHeight = `${this.size}px`;
        iconElement.style.width = `${this.size}px`;
        iconElement.style.verticalAlign = "middle";
        iconElement.className = `mdi mdi-${this.name} mdi-${this.size}px`;
    }
}

export default MdiIconComponent;