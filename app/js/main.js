//= partials/init-animation.js
//= partials/slider.js

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