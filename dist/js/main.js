let waitings = document.querySelectorAll("[class $='waiting-animation']");
console.log(waitings);

window.addEventListener("scroll", (event) => {
	Array.prototype.forEach.call(waitings, (elementAnimation) => {
		let top = elementAnimation.offsetTop;

		if(window.pageYOffset > top) {
			elementAnimation.classList.add("animation");

			if(elementAnimation.id === 'progressbars') {
				let progressbars = elementAnimation.children;

				Array.prototype.forEach.call(progressbars, (progressbar) => {
					setUpTotalProgressbar(progressbar.children[2].children[0].firstElementChild, parseInt(progressbar.children[1].dataset.total));
					progressbar.children[1].innerHTML = `${progressbar.children[1].dataset.total}%`;
				});
			}
		}
	});
});

function setUpTotalProgressbar(progressbar, total) {
	if(total !== 'undefined' || total !== null) {
		let lengthTrack = 3.14*2*parseInt(progressbar.getAttribute("r"));
		let newTotal = lengthTrack * (total/100);

		progressbar.style.strokeDasharray = `${newTotal} ${lengthTrack - newTotal}`;
	}
}
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

const slider = new CustomSlider(document.querySelector('.presentation-block__container'));
const arrows = document.querySelectorAll('.presentation-block__arrow');
const descr_blocks = document.querySelectorAll('.wrapp-slide-block');
const descr_slider = descr_blocks[0].parentElement;

Array.prototype.forEach.call(slider.container.children, function(slide) {
	Object.assign(slide.style, {
		backgroundImage: `url(${slide.dataset.image})`
	})
})

arrows[0].addEventListener("click", clickArrowListener);
arrows[1].addEventListener("click", clickArrowListener);

function clickArrowListener(event) {

	if(slider.isClick != true) {
		slider.isClick = true;
		
		var timer = setTimeout(() => {
			slider.isClick = false;
			descr_slider.classList.remove("transition");
		}, 990);

		descr_slider.classList.add("transition");

		if(event.currentTarget.classList.contains("arrow--left")) { slider.prev(); } else { slider.next(); }
		Array.prototype.forEach.call(descr_blocks, (descr_block, index) => {
			descr_block.classList.remove("active");
			if(index == slider.currentSlide) {
				descr_block.classList.add("active");
			}
		})
	} else {
		clearTimeout(timer);
	}
}