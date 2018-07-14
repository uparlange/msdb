import AbstractComponent from "./AbstractComponent.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import AppUtils from "./AppUtils.js";

class GalleryComponent extends AbstractComponent {
	static get annotations() {
		return this.getAnnotations({
			selector: "gallery",
			inputs: ["provider", "colcount", "gap"]
		});
	}
	static get parameters() {
		return AppUtils.getParameters(ng.core.ElementRef, ng.core.Renderer, AbstractClassHelper);
	}
	constructor(ElementRef, Renderer, AbstractClassHelper) {
		super(AbstractClassHelper);
		this._element = ElementRef.nativeElement;
		this._renderer = Renderer;
		this._windowResizeHandler = null;
		this._gallery = null;
		this._masonry = null;
		this._resizeTimeout = null;
	}
	onInit() {
		this._onWindowResizeHandler = () => {
			this._refreshMasonry();
		};
		this._windowResizeHandler = this._renderer.listen(this.getWindowRef().nativeWindow, "resize", this._onWindowResizeHandler);
	}
	onDestroy() {
		if (this._gallery !== null) {
			this._gallery.close();
		}
		if (this._masonry !== null) {
			this._masonry.destroy();
		}
		this._windowResizeHandler();
	}
	trackByName(index, item) {
		return item ? item.name : undefined;
	}
	getItemStyles(image) {
		const colwidth = this._getColWidth();
		const styles = {
			'float': 'left',
			'width': `${colwidth}px`,
			'height': `${this._getItemHeight(colwidth, image)}px`,
			'margin-bottom': `${this.gap}px`
		};
		return styles;
	}
	openImage(image) {
		if (this._gallery !== null) {
			this._gallery.close();
		}
		const options = {
			index: this.provider.indexOf(image),
			clickToCloseNonZoomable: false,
			shareEl: false,
			history: false
		};
		this._gallery = new PhotoSwipe(this._getPhotoSwipeContainer(), PhotoSwipeUI_Default, this.provider, options);
		this._gallery.init();
	}
	imagesCreated() {
		this._refreshMasonry();
	}
	_getItemHeight(requiredWidth, image) {
		return Math.round(requiredWidth * image.h / image.w);
	}
	_refreshMasonry() {
		setTimeout(() => {
			if (this._masonry !== null) {
				this._masonry.destroy();
			}
			this._masonry = new Masonry(".grid", {
				itemSelector: ".grid-item",
				columnWidth: this._getColWidth(),
				gutter: this.gap,
				resize: false
			});
		}, 50);
	}
	_windowResizeHandler() {
		this._refreshMasonry();
	}
	_getGalleryContainer() {
		/* TODO get reference in other way ? */
		return this._element.getElementsByClassName("gallery")[0];
	}
	_getPhotoSwipeContainer() {
		/* TODO get reference in other way ? */
		return this._element.getElementsByClassName("pswp")[0];
	}
	_getColWidth() {
		const colcount = Math.min(this.colcount, this.provider.length);
		return Math.round((this._getGalleryContainer().clientWidth - (colcount * this.gap)) / colcount);
	}
}

export default GalleryComponent;