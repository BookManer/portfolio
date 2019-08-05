function CustomSlider(container) {
	this.container = container;
	this.slides = container.children;
	this.count = this.slides.length;
	this.currentSlide;
	this._currentSlideInset = 0;
	var self = this;

	Object.defineProperty(this, 'currentSlide', {
		get: () => {
			return this._currentSlideInset;
		},
		set: (value) => {
			let prevSlide = this._currentSlideInset;
			CustomSlider.prototype.toScroll.call(self, value, prevSlide < value ? 1 : -1);
		}
	})
}

CustomSlider.prototype.next = function() {
	CustomSlider.prototype.toScroll.call(this, 1, 1);
}

CustomSlider.prototype.prev = function() {
	CustomSlider.prototype.toScroll.call(this, 1, -1);
}

CustomSlider.prototype.toScroll = function(numSlide, dir) {
	let resSlide = this._currentSlideInset + dir*numSlide;
	if(resSlide < 0) {
		this._currentSlideInset = this.count-1;
	} else if(resSlide > this.count -1) {
		this._currentSlideInset = 0;
	} else {
		this._currentSlideInset = resSlide;
	}

	Object.assign(this.container.style, {
		left: `-${Math.abs(this._currentSlideInset)*100}%`
	})
}