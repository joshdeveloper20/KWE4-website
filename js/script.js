const menuBar = document.querySelector(".menubar"),
	navMenu = document.querySelector(".nav-mobile"),
	mediaSize = 900,
	header = document.querySelector("header"),
	btns = document.querySelectorAll(".accordion__heading"),
	acc_body = document.querySelectorAll(".accordion__body"),
	acc_container = document.querySelector(".accordion");

window.addEventListener("scroll", function () {
	if (window.scrollY > 0) {
		header.classList.add("active");
	} else {
		header.classList.remove("active");
	}
});

menuBar.addEventListener("click", toggleNav);

function toggleNav() {
	navMenu.classList.toggle("open");

	navMenu.addEventListener("click", (e) => {
		// console.log(e.target);

		if (
			e.target.hasAttribute("data-toggle") &&
			window.innerWidth <= mediaSize
		) {
			const meuItemHasChildren = e.target.parentElement;

			// if menuItemHasChildren is already expanded, collapse it
			if (meuItemHasChildren.classList.contains("active")) {
				collapseSubMenu();
			} else {
				// collapse existing expanded menuItemHasChildren
				if (navMenu.querySelector(".menu-item-has-children.active")) {
					collapseSubMenu();
				}

				// expand new meuItemHasChildren
				meuItemHasChildren.classList.add("active");
				const subMenu = meuItemHasChildren.querySelector(".submenu");
				subMenu.style.maxHeight = subMenu.scrollHeight + "px";
			}
		}
	});

	function collapseSubMenu() {
		navMenu
			.querySelector(".menu-item-has-children.active .submenu")
			.removeAttribute("style");
		navMenu
			.querySelector(".menu-item-has-children.active")
			.classList.remove("active");
	}

	function resizeFix() {
		if (navMenu.classList.contains("open")) {
			toggleNav();
		}
	}

	window.addEventListener("resize", function () {
		if (this.innerWidth > mediaSize) {
			resizeFix();
		}
	});
}

// ACCORDION
btns.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		acc_body.forEach((content) => {
			if (e.target.nextElementSibling == null) return;
			if (
				e.target.nextElementSibling !== content &&
				content.classList.contains("active")
			) {
				content.classList.remove("active");
				btns.forEach((btn) => btn.classList.remove("active"));
			}
		});

		const panel = btn.nextElementSibling;
		panel.classList.toggle("active");
		btn.classList.toggle("active");
	});
});

//SWIPER EFFECT
var swiper = new Swiper(".card__content", {
	slidesPerView: 2,
	spaceBetween: 32,
	grabCursor: true,
	loop: true,
	autoplay: {
		delay: 2500,
		disableOnInteraction: false,
	},
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
		dynamicBullets: true,
	},
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},

	breakpoints: {
		0: {
			slidesPerView: 1,
		},
		768: {
			slidesPerView: 2,
		},
	},
});
