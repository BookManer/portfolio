var waitings = document.querySelectorAll("[class $='waiting-animation']");

window.addEventListener("scroll", function(event) {
	Array.prototype.forEach.call(waitings, function(elementAnimation) {
		let top = elementAnimation.offsetTop;

		if(window.pageYOffset > top && elementAnimation.classList.contains("js-waiting-animaiton")) {
			elementAnimation.classList.add("animation");
			elementAnimation.classList.remove("js-waiting-animaiton");

			if(elementAnimation.id === 'progressbars') {
				let progressbars = elementAnimation.children;
				Array.prototype.forEach.call(progressbars, function(progressbar) {
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