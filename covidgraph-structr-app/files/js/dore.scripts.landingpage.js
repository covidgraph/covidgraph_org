$.dore = function(e, o) {
	this.settings = {};
	$(e), e = e;
	var a = 992;
	! function() {
		function e() {
			if ($(".home-row").length > 0) {
				var e = $(".home-row").offset().left;
				//$(".landing-page .section.home").css("background-position-x", e - 580 + "px")
			}
			if ($(".footer-row").length > 0) {
				var o = $(".footer-row").offset().left;
				$(".landing-page .section.footer").css("background-position-x", Math.min($(window).width() - o - 2e3, 0) + "px")
			}
			$(window).width() >= a && $(".landing-page").removeClass("show-mobile-menu")
		}
		$().owlCarousel && ($(".home-carousel").length > 0 && $(".home-carousel").owlCarousel({
			margin: 15,
			stagePadding: 15,
			loop: false,
			autoplay: false,
			responsive: {
				0: {
					items: 4
				},
				768: {
					items: 4
				},
				992: {
					items: 4
				},
				1200: {
					items: 4
				}
			}
		}).data("owl.carousel").onResize(), $(".owl-dot").click(function() {
			$($(this).parents(".owl-container").find(".owl-carousel")).owlCarousel().trigger("to.owl.carousel", [$(this).index(), 300])
		}), $(".owl-prev").click(function(e) {
			e.preventDefault(), $($(this).parents(".owl-container").find(".owl-carousel")).owlCarousel().trigger("prev.owl.carousel", [300])
		}), $(".owl-next").click(function(e) {
			e.preventDefault(), $($(this).parents(".owl-container").find(".owl-carousel")).owlCarousel().trigger("next.owl.carousel", [300])
		})), $("#contactButton").on("click", function(e) {
			e.preventDefault();
			var o = $(this);
			o.hasClass("show-fail") || o.hasClass("show-spinner") || o.hasClass("show-success") || (o.addClass("show-spinner"), o.addClass("active"), setTimeout(function() {
				o.addClass("show-success"), o.removeClass("show-spinner"), o.find(".icon.success").tooltip("show"), setTimeout(function() {
					o.removeClass("show-success"), o.removeClass("active"), o.find(".icon.success").tooltip("dispose")
				}, 2e3)
			}, 3e3))
		}), $().headroom && ($(".landing-page nav").headroom({
			offset: 100
		}), $(window).scrollTop() > 100 && $(".landing-page nav").addClass("headroom--pinned")), $().barrating && $(".rating").each(function() {
			var e = $(this).data("currentRating"),
				o = $(this).data("readonly");
			$(this).barrating({
				theme: "bootstrap-stars",
				initialRating: e,
				readonly: o
			})
		}), $(".landing-page .mobile-menu-button").on("click", function(e) {
			e.preventDefault(), $(".landing-page").toggleClass("show-mobile-menu")
		}), $(".landing-page").on("click", function(e) {
			$(e.target).parents().hasClass("mobile-menu-button") || $(e.target).hasClass("mobile-menu-button") || $(e.target).hasClass("mobile-menu") || $(e.target).parents().hasClass("mobile-menu") || !$(".landing-page").hasClass("show-mobile-menu") || (e.preventDefault(), $(".landing-page").removeClass("show-mobile-menu"))
		}), $(".scrollTo").on("click", function(e) {
			//e.preventDefault();
			var o = $(this).attr("href");
			$(window).scrollTo(o, 500, {
				offset: {
					top: -50
				},
				onAfter: function() {
					$(".landing-page").hasClass("show-mobile-menu") && $(".landing-page").removeClass("show-mobile-menu"), "#home" != o && setTimeout(function() {
						$(".landing-page-nav").removeClass("headroom--pinned"), $(".landing-page-nav").addClass("headroom--unpinned")
					}, 60)
				}
			})
		}), $().ellipsis && $(".ellipsis").ellipsis({
			live: !0
		}), $().tooltip && $('[data-toggle="tooltip"]').tooltip(), $(".feedback-container").on("click", "a", function e(o) {
			o.preventDefault(), $(".feedback-container").off("click", "a", e), $(".feedback-container a").tooltip("dispose"), $(".feedback-container a").animate({
				opacity: 0
			}, 300, function() {
				$(".feedback-container a").css("visibility", "hidden")
			}), $(".feedback-container .feedback-answer").html($(o.currentTarget).data("message"))
		}), $(window).on("resize", e), e(), $("body > *").stop().delay(100).animate({
			opacity: 1
		}, 500), $(".theme-colors").addClass("default-transition"), $(".mobile-menu").addClass("default-transition"), $("body").removeClass("show-spinner")
	}()
}, $.fn.dore = function(e) {
	return this.each(function() {
		if (null == $(this).data("dore")) {
			var o = new $.dore(this, e);
			$(this).data("dore", o)
		}
	})
};