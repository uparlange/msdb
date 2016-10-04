define(["AppUtils"], 
function(AppUtils) 
{
	const componentName = "gallery";
	
	return ng.core.Component({
		selector: componentName,
		templateUrl: AppUtils.getTemplateUrl(componentName),
		inputs:["folder", "provider", "colcount", "gap"]
	}).Class({
		constructor: [ng.core.ElementRef,
			function (element)
			{
				this._element = element;
				
				this._gallery = null;
				
				this._masonry = null;
				
				this._resizeTimeout = null;
				
				this._lastGalleryContainerWidth = null;
			}
		],
		ngOnInit:function()
		{
			this._windowResizeHandler = () =>
			{
				this._refreshMasonry();
			}
			
			window.addEventListener("resize", this._windowResizeHandler);
		},
		ngOnDestroy:function()
		{
			if(this._gallery !== null)
			{
				this._gallery.close();
			}
			
			if(this._masonry !== null)
			{
				this._masonry.destroy();
			}
			
			window.removeEventListener("resize", this._windowResizeHandler);
		},
		getImageUrl:function(image)
		{
			return this.folder + "/" + image.name;
		},
		getItemStyles:function(image)
		{
			const styles = {
				'float': 'left', 
				'width':this._getColWidth() + "px", 
				'height':this.getHeight(image) + "px",
				'margin-bottom':this.gap + "px"
			};
			return styles;
		},
		getHeight:function(image)
		{
			if(!image)
			{
				return 0;
			}
			return Math.round(this._getColWidth() * image.height / image.width);
		},
		openImage:function(image)
		{
			this.provider.forEach((element, index, array) =>
			{
				if(element.name === image.name)
				{
					this._openPhotoSwift(index);
					return;
				}
			});
		},
		imagesCreated:function()
		{
			this._refreshMasonry();
		},
		_refreshMasonry:function()
		{
			const currentGalleryContainerWidth = this._getGalleryContainer().clientWidth;
			
			if(this._lastGalleryContainerWidth === null || this._lastGalleryContainerWidth !== currentGalleryContainerWidth)
			{
				if(this._masonry !== null)
				{
					this._masonry.destroy();
				}
				
				requirejs(["node_modules/masonry-layout/dist/masonry.pkgd.min.js"], (Masonry) => 
				{
					this._masonry = new Masonry(".grid", {
						itemSelector: ".grid-item",
						columnWidth: this._getColWidth(),
						gutter:this.gap,
						resize:false
					});
					
					this._lastGalleryContainerWidth = currentGalleryContainerWidth;
				});
			}
		},
		_windowResizeHandler:function()
		{
			this._refreshMasonry();
		},
		_getGalleryContainer:function()
		{
			const element = this._element.nativeElement;
			
			return element.getElementsByClassName("gallery")[0];
		},
		_getPhotoSwipeContainer:function()
		{
			const element = this._element.nativeElement;
			
			return element.getElementsByClassName("pswp")[0];
		},
		_getColWidth:function()
		{
			return Math.round((this._getGalleryContainer().clientWidth - (this.colcount * this.gap)) / this.colcount);
		},
		_openPhotoSwift:function(index)
		{
			if(this._gallery !== null)
			{
				this._gallery.close();
			}
			
			requirejs(["node_modules/photoswipe/dist/photoswipe.min.js", "node_modules/photoswipe/dist/photoswipe-ui-default.min.js"], (PhotoSwipe, PhotoSwipeUI_Default) => 
			{
				const element = this._element.nativeElement;
			
				const items = [];
				this.provider.forEach((image, index, array) =>
				{
					items.push({
						src:this.getImageUrl(image),
						w:image.width,
						h:image.height
					});
				});

				const options = {
					index: index,
					clickToCloseNonZoomable:false,
					shareEl:false
				};

				this._gallery = new PhotoSwipe(this._getPhotoSwipeContainer(), PhotoSwipeUI_Default, items, options);
				this._gallery.init();
			});
		}
	});
});