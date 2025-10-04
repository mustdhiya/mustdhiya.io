


	// Inline popups
	$('#inline-popups').magnificPopup({
	  delegate: 'a',
	  removalDelay: 500, //delay removal by X to allow out-animation
	  callbacks: {
		beforeOpen: function() {
		   this.st.mainClass = this.st.el.attr('data-effect');
		}
	  },
	  midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
	});


	// Image popups
	$('.lightbox').magnificPopup({
	 // delegate: 'a',
	  type: 'image',
	  mainClass: 'mfp-3d-unfold',
	  removalDelay: 500, //delay removal by X to allow out-animation
	  callbacks: {
		beforeOpen: function() {
		  // just a hack that adds mfp-anim class to markup 
		   this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
		  // this.st.mainClass = this.st.el.attr('data-effect');
		}
	  },
	  closeOnContentClick: true,
	  midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
	});


	// Hinge effect popup
	$('a.hinge').magnificPopup({
	  mainClass: 'mfp-with-fade',
	  removalDelay: 1000, //delay removal by X to allow out-animation
	  callbacks: {
		beforeClose: function() {
			this.content.addClass('hinge');
		}, 
		close: function() {
			this.content.removeClass('hinge'); 
		}
	  },
	  midClick: true
	});
	
	//GALERY
$(document).ready(function() {
	$('.popup-gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		 mainClass: 'mfp-3d-unfold',
	  removalDelay: 500, //delay removal by X to allow out-animation
	  callbacks: {
		beforeOpen: function() {
		  // just a hack that adds mfp-anim class to markup 
		   this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
		  // this.st.mainClass = this.st.el.attr('data-effect');
		}
	  },
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			titleSrc: function(item) {
				return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
			}
		}
	});
});

// VIDEO GMAPS POPUP
$(document).ready(function() {
	$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,

		fixedContentPos: false
	});
});
