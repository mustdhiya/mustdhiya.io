//CALCULATING THE BROWSER SCROLLBAR WIDTH-----------
 'use strict';
var parent, child, scrollWidth, bodyWidth;

if (scrollWidth === undefined) {
  parent = jQuery('<div style="width: 50px; height: 50px; overflow: auto"><div/></div>').appendTo('body');
  child = parent.children();
  scrollWidth = child.innerWidth() - child.height(99).innerWidth();
  parent.remove();
} 

//HEADER MENU---------------------------------------
function menu() {
	'use strict';
  var $       = jQuery,
	  body    = $('body'),
	  primary = '.main-menu';
  
  $(primary).find('.parent > a .open-sub, .megamenu .title .open-sub').remove();
  
  $(primary).find('.parent > a, .megamenu .title').append('<span class="open-sub"><span ></span></span>');
  
  $(primary).find('.open-sub').click(function(event){
	event.preventDefault();
	
	var item = $(this).closest('li, .box');
	
	if ($(item).hasClass('active')) {
	  $(item).children().last().slideUp(50);
	  $(item).removeClass('active');
	} else {
	  var li = $(this).closest('li, .box').parent('ul, .sub-list').children('li, .box');
	  
	  if ($(li).is('.active')) {
		$(li).removeClass('active').children('ul').slideUp(50);
	  }
	  
	  $(item).children().last().slideDown(50);
	  $(item).addClass('active');
	}
  });

   $(primary).find('.parent > a').click(function(event){
	if (((body.width() + scrollWidth) > 979) &&  (navigator.userAgent.match(/iPad|iPhone|Android/i))) {
	  var link = $(this);
	  
	  if (link.parent().hasClass('open')) {
		link.parent().removeClass('open'),
		event.preventDefault();
	  } else {
		event.preventDefault();
		link.parent().addClass('open')
	  }
	}
  }); 
  
//HOVER IPHONE---------------------------------------

  body.on('click', function(event) {
	if (!$(event.target).is(primary + ' *')) {
	  if ($(primary + ' .collapse').hasClass('in')) {
		$(primary + ' .navbar-toggle').addClass('collapsed');
		$(primary + ' .navbar-collapse').collapse('hide');
	  }
	}
  });
  
  /* Top Menu */
  var topMenu = $('.top-navbar').find('.collapse');

  if ((body.width() + scrollWidth) < 768) {
	topMenu.css('width', body.width());
  } else {
	topMenu.css('width', 'auto');
  }
}

//SCROLL TO TOP----------------------------------------------------
$(document).ready(function(){
	'use strict';
	//var $ = jQuery,

			// hide #back-top first
			$("#back-top").hide();
			
			// fade in #back-top
			$(function () {
				$(window).scroll(function () {
					if ($(this).scrollTop() > 100) {
						$('#back-top').fadeIn();
					} else {
						$('#back-top').fadeOut();
					}
				});

				// scroll body to 0px on click
				$('#back-top a').click(function () {
					$('body,html').animate({
						scrollTop: 0
					}, 600);
					return false;
				});
			});

//TOGGLE-------------------------------------------------------
	$('.toggle-view-custom li').click(function () {

		var text = $(this).children('div.panel');

		if (text.is(':hidden')) {
			text.slideDown('10');
			$(this).children('.ui-accordion-header').addClass('ui-accordion-header-active');		
		} else {
			text.slideUp('10');
			$(this).children('.ui-accordion-header').removeClass('ui-accordion-header-active');		
		}

	});

//ACCORDION-----------------------------------------------------
    $(".accordion-custom").accordion({
	  heightStyle: 'content'
	   /*icons: { "header": "plus", "headerSelected": "minus" }*/
	});


//FIXED HEADER----------------------------------------------------
	// DM Menu
	jQuery('#nav').affix({
		offset: { top: 1, }
	});

//TIME LINE-----------------------------------------------------
	var $timeline_block = $('.cd-timeline-block');

	//hide timeline blocks which are outside the viewport
	$timeline_block.each(function(){
		if($(this).offset().top > $(window).scrollTop()+$(window).height()*0.75) {
			$(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
		}
	});

	//on scolling, show/animate timeline blocks when enter the viewport
	$(window).on('scroll', function(){
		$timeline_block.each(function(){
			if( $(this).offset().top <= $(window).scrollTop()+$(window).height()*0.75 && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) {
				$(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
			}
		});
	});

  //Functions---------------------------------------
  menu();
 
  
  //JS loaded---------------------------------------
 /*  $('body').addClass('loaded'); */
  
});

//HEADER STYCKY INDENT -----------------------------------------------------
$(document).on("scroll", function() {

setTimeout(function() {

  if ($('#nav').hasClass('affix')) {
    $('.page-main-content').addClass('affix-indent');
  }  else {
		$('.page-main-content').removeClass('affix-indent');
	};
	
},0);
	
}); 

//MAGNIFIC POPUP SETTINGS -----------------------------------------------------
			function magnPopupStart() {
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
							/*titleSrc: function(item) {
								return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
							}*/
						}
					});
				
				//GALERY 2
					$('.popup-gallery2').magnificPopup({
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
							/*titleSrc: function(item) {
								return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
							}*/
						}
					});
				
				//MULTI GALERY 
					$('.popup-multi-gallery').each(function() { // the containers for all your galleries
						$(this).magnificPopup({
							delegate: 'a', // the selector for gallery item
							type: 'image',
							gallery: {
							  enabled:true
							}
						});
					});

				// VIDEO GMAPS POPUP
					$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
						//disableOn: 700,
						type: 'iframe',
						mainClass: 'mfp-fade',
						removalDelay: 160,
						preloader: false,

						fixedContentPos: false
					});

			};	

			jQuery(document).ready(function(){	
				 magnPopupStart();
			});	
			
//END MAGNIFIC POPUP SETTINGS -----------------------------------------------------			

//NEWSLETTER-----------------------------------------------------------------------
			$(function () {
			'use strict';
			  var $form = $('#mc-embedded-subscribe-form');

			  $('#mc-embedded-subscribe').on('click', function(event) {
				if(event) event.preventDefault();
				register($form);
			  });
			});

			function register($form) {
			  $.ajax({
				type: $form.attr('method'),
				url: $form.attr('action'),
				data: $form.serialize(),
				cache       : false,
				dataType    : 'json',
				contentType: "application/json; charset=utf-8",
				error       : function(err) { $('#notification_container').html('<div id="nl-alert-container"  class="alert alert-info alert-dismissible fade in bounceIn" role="alert" ><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>Could not connect to server. Please try again later.</div>'); },
				success     : function(data) {
				 
				  if (data.result != "success") {
					var message = data.msg;
					$('#notification_container').html('<div id="nl-alert-container"  class="alert alert-info alert-dismissible fade in bounceIn" role="alert" ><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'+message+'</div>');
				  } 

				  else {
					var message = data.msg;
					$('#notification_container').html('<div id="nl-alert-container"  class="alert alert-info alert-dismissible fade in bounceIn" role="alert" ><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'+message+'</div>');
				  }
				}
			  });
			}
//END NEWSLETTER	-------------------------------------------------------------------			

// SEARCH ---------------------------------------------------------------------

// SEARCH CLASS IE ---------------------------------
/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */

( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else {
  // browser global
  window.classie = classie;
}

})( window );


// UI SEARCH  ---------------------------------------------------------------

/**
 * uisearch.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
;( function( window ) {
	
	'use strict';
	
	// EventListener | @jon_neal | //github.com/jonathantneal/EventListener
	!window.addEventListener && window.Element && (function () {
	   function addToPrototype(name, method) {
		  Window.prototype[name] = HTMLDocument.prototype[name] = Element.prototype[name] = method;
	   }
	 
	   var registry = [];
	 
	   addToPrototype("addEventListener", function (type, listener) {
		  var target = this;
	 
		  registry.unshift({
			 __listener: function (event) {
				event.currentTarget = target;
				event.pageX = event.clientX + document.documentElement.scrollLeft;
				event.pageY = event.clientY + document.documentElement.scrollTop;
				event.preventDefault = function () { event.returnValue = false };
				event.relatedTarget = event.fromElement || null;
				event.stopPropagation = function () { event.cancelBubble = true };
				event.relatedTarget = event.fromElement || null;
				event.target = event.srcElement || target;
				event.timeStamp = +new Date;
	 
				listener.call(target, event);
			 },
			 listener: listener,
			 target: target,
			 type: type
		  });
	 
		  this.attachEvent("on" + type, registry[0].__listener);
	   });
	 
	   addToPrototype("removeEventListener", function (type, listener) {
		  for (var index = 0, length = registry.length; index < length; ++index) {
			 if (registry[index].target == this && registry[index].type == type && registry[index].listener == listener) {
				return this.detachEvent("on" + type, registry.splice(index, 1)[0].__listener);
			 }
		  }
	   });
	 
	   addToPrototype("dispatchEvent", function (eventObject) {
		  try {
			 return this.fireEvent("on" + eventObject.type, eventObject);
		  } catch (error) {
			 for (var index = 0, length = registry.length; index < length; ++index) {
				if (registry[index].target == this && registry[index].type == eventObject.type) {
				   registry[index].call(this, eventObject);
				}
			 }
		  }
	   });
	})();

	// http://stackoverflow.com/a/11381730/989439
	function mobilecheck() {
		var check = false;
		(function(a){if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
		return check;
	}
	
	// http://www.jonathantneal.com/blog/polyfills-and-prototypes/
	!String.prototype.trim && (String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g, '');
	});

	function UISearch( el, options ) {	
		this.el = el;
		this.inputEl = el.querySelector( 'form > input.sb-search-input' );
		this._initEvents();
	}

	UISearch.prototype = {
		_initEvents : function() {
			var self = this,
				initSearchFn = function( ev ) {
					ev.stopPropagation();
					// trim its value
					self.inputEl.value = self.inputEl.value.trim();
					
					if( !classie.has( self.el, 'sb-search-open' ) ) { // open it
						ev.preventDefault();
						self.open();
					}
					else if( classie.has( self.el, 'sb-search-open' ) && /^\s*$/.test( self.inputEl.value ) ) { // close it
						ev.preventDefault();
						self.close();
					}
				}

			this.el.addEventListener( 'click', initSearchFn );
			this.el.addEventListener( 'touchstart', initSearchFn );
			this.inputEl.addEventListener( 'click', function( ev ) { ev.stopPropagation(); });
			this.inputEl.addEventListener( 'touchstart', function( ev ) { ev.stopPropagation(); } );
		},
		open : function() {
			var self = this;
			classie.add( this.el, 'sb-search-open' );
			// focus the input
			if( !mobilecheck() ) {
				this.inputEl.focus();
			}
			// close the search input if body is clicked
			var bodyFn = function( ev ) {
				self.close();
				this.removeEventListener( 'click', bodyFn );
				this.removeEventListener( 'touchstart', bodyFn );
			};
			document.addEventListener( 'click', bodyFn );
			document.addEventListener( 'touchstart', bodyFn );
		},
		close : function() {
			this.inputEl.blur();
			classie.remove( this.el, 'sb-search-open' );
		}
	}

	// add to global namespace
	window.UISearch = UISearch;

} )( window );

// ---END UI SEARCH -----------------------------------------------------------

new UISearch( document.getElementById( 'sb-search' ) );

// END SEARCH ---------------------------------------------------------------------


//jQuery Cookie Plugin FOR STYLESWITCHER	--------------------------------------------------------------
/*!
 * jQuery Cookie Plugin v1.3
 * https://github.com/carhartl/jquery-cookie
 */
(function(e,t,n){function i(e){return e}function s(e){return decodeURIComponent(e.replace(r," "))}var r=/\+/g;var o=e.cookie=function(r,u,a){if(u!==n){a=e.extend({},o.defaults,a);if(u===null){a.expires=-1}if(typeof a.expires==="number"){var f=a.expires,l=a.expires=new Date;l.setDate(l.getDate()+f)}u=o.json?JSON.stringify(u):String(u);return t.cookie=[encodeURIComponent(r),"=",o.raw?u:encodeURIComponent(u),a.expires?"; expires="+a.expires.toUTCString():"",a.path?"; path="+a.path:"",a.domain?"; domain="+a.domain:"",a.secure?"; secure":""].join("")}var c=o.raw?i:s;var h=t.cookie.split("; ");for(var p=0,d;d=h[p]&&h[p].split("=");p++){if(c(d.shift())===r){var v=c(d.join("="));return o.json?JSON.parse(v):v}}return null};o.defaults={};e.removeCookie=function(t,n){if(e.cookie(t)!==null){e.cookie(t,null,n);return true}return false}})(jQuery,document)

//STYLESWITCHER	--------------------------------------------------------------
!function(e){"use strict";window.console=window.console||function(){var e={};return e.log=e.warn=e.debug=e.info=e.error=e.time=e.dir=e.profile=e.clear=e.exception=e.trace=e.assert=function(){},e}(),e(document).ready(function(){var s=' 	<h2>TEMPLATE STYLES <a href="#"><i class="icon_cogs"></i></a></h2>     <div class="content2">   <h3>Color Style</h3>     <div class="switcher-box">     <a id="yellow" class="styleswitch color current"></a> <a id="cyan" class="styleswitch color"></a> <a id="blue" class="styleswitch color"></a> <a id="teal" class="styleswitch color"></a> <a id="green" class="styleswitch color"></a>   <a id="lime" class="styleswitch color"></a> 	<a id="deeporange" class="styleswitch color"></a>          </div><!-- End switcher-box -->     <div class="clear"></div>      <div class="bg hidden">      <h3>Background Image</h3>      <a id="bg-1" class="pattern current"></a>     <a id="bg-2" class="pattern"></a>     <a id="bg-3" class="pattern"></a>     <a id="bg-4" class="pattern"></a>     <a id="bg-5" class="pattern"></a>     <a id="bg-6" class="pattern"></a>     <a id="bg-7" class="pattern"></a>     <a id="bg-8" class="pattern"></a>     <a id="bg-9" class="pattern"></a>     <a id="bg-10" class="pattern"></a>   </div>     <div class="clear"></div>   <h3>Layout Style</h3> 	<div class="layout-switcher">     <a id="wide" class="layout button" onClick="window.location.href=window.location.href" >WIDE</a>     <a id="boxed" class="layout button " onClick="window.location.href=window.location.href" >BOXED</a>     </div>     <div class="clear"></div><a id="reset" class="dark-style button " onClick="window.location.href=window.location.href" >RESET</a></div> <!-- End content --> 	';e(".switcher").prepend(s)}),e(document).ready(function(){e.cookie("mycookie");e("body").addClass("bg-1"),e("#bg-2").click(function(){e("body").removeClass("bg-1"),e("body").removeClass("bg-3"),e("body").removeClass("bg-4"),e("body").removeClass("bg-5"),e("body").removeClass("bg-6"),e("body").removeClass("bg-7"),e("body").removeClass("bg-8"),e("body").removeClass("bg-9"),e("body").removeClass("bg-10"),e("body").addClass("bg-2"),e.cookie("mycookie","bg-2"),e(".pattern").removeClass("current"),e(this).addClass("current")}),e("#bg-3").click(function(){e("body").removeClass("bg-1"),e("body").removeClass("bg-2"),e("body").removeClass("bg-4"),e("body").removeClass("bg-5"),e("body").removeClass("bg-6"),e("body").removeClass("bg-7"),e("body").removeClass("bg-8"),e("body").removeClass("bg-9"),e("body").removeClass("bg-10"),e("body").addClass("bg-3"),e.cookie("mycookie","bg-3"),e(".pattern").removeClass("current"),e(this).addClass("current")}),e("#bg-4").click(function(){e("body").removeClass("bg-1"),e("body").removeClass("bg-2"),e("body").removeClass("bg-3"),e("body").removeClass("bg-5"),e("body").removeClass("bg-6"),e("body").removeClass("bg-7"),e("body").removeClass("bg-8"),e("body").removeClass("bg-9"),e("body").removeClass("bg-10"),e("body").addClass("bg-4"),e.cookie("mycookie","bg-4"),e(".pattern").removeClass("current"),e(this).addClass("current")}),e("#bg-1").click(function(){e("body").removeClass("bg-2"),e("body").removeClass("bg-3"),e("body").removeClass("bg-4"),e("body").removeClass("bg-5"),e("body").removeClass("bg-6"),e("body").removeClass("bg-7"),e("body").removeClass("bg-8"),e("body").removeClass("bg-9"),e("body").removeClass("bg-10"),e("body").addClass("bg-1"),e.cookie("mycookie","bg-1"),e(".pattern").removeClass("current"),e(this).addClass("current")}),e("#bg-5").click(function(){e("body").removeClass("bg-1"),e("body").removeClass("bg-3"),e("body").removeClass("bg-4"),e("body").removeClass("bg-2"),e("body").removeClass("bg-6"),e("body").removeClass("bg-7"),e("body").removeClass("bg-8"),e("body").removeClass("bg-9"),e("body").removeClass("bg-10"),e("body").addClass("bg-5"),e.cookie("mycookie","bg-5"),e(".pattern").removeClass("current"),e(this).addClass("current")}),e("#bg-6").click(function(){e("body").removeClass("bg-1"),e("body").removeClass("bg-3"),e("body").removeClass("bg-4"),e("body").removeClass("bg-5"),e("body").removeClass("bg-2"),e("body").removeClass("bg-7"),e("body").removeClass("bg-8"),e("body").removeClass("bg-9"),e("body").removeClass("bg-10"),e("body").addClass("bg-6"),e.cookie("mycookie","bg-6"),e(".pattern").removeClass("current"),e(this).addClass("current")}),e("#bg-7").click(function(){e("body").removeClass("bg-1"),e("body").removeClass("bg-3"),e("body").removeClass("bg-4"),e("body").removeClass("bg-5"),e("body").removeClass("bg-6"),e("body").removeClass("bg-2"),e("body").removeClass("bg-8"),e("body").removeClass("bg-9"),e("body").removeClass("bg-10"),e("body").addClass("bg-7"),e.cookie("mycookie","bg-7"),e(".pattern").removeClass("current"),e(this).addClass("current")}),e("#bg-8").click(function(){e("body").removeClass("bg-1"),e("body").removeClass("bg-3"),e("body").removeClass("bg-4"),e("body").removeClass("bg-5"),e("body").removeClass("bg-6"),e("body").removeClass("bg-7"),e("body").removeClass("bg-2"),e("body").removeClass("bg-9"),e("body").removeClass("bg-10"),e("body").addClass("bg-8"),e.cookie("mycookie","bg-8"),e(".pattern").removeClass("current"),e(this).addClass("current")}),e("#bg-9").click(function(){e("body").removeClass("bg-1"),e("body").removeClass("bg-3"),e("body").removeClass("bg-4"),e("body").removeClass("bg-5"),e("body").removeClass("bg-6"),e("body").removeClass("bg-7"),e("body").removeClass("bg-8"),e("body").removeClass("bg-2"),e("body").removeClass("bg-10"),e("body").addClass("bg-9"),e.cookie("mycookie","bg-9"),e(".pattern").removeClass("current"),e(this).addClass("current")}),e("#bg-10").click(function(){e("body").removeClass("bg-1"),e("body").removeClass("bg-3"),e("body").removeClass("bg-4"),e("body").removeClass("bg-5"),e("body").removeClass("bg-6"),e("body").removeClass("bg-7"),e("body").removeClass("bg-8"),e("body").removeClass("bg-9"),e("body").removeClass("bg-2"),e("body").addClass("bg-10"),e.cookie("mycookie","bg-10"),e(".pattern").removeClass("current"),e(this).addClass("current")}),e("#reset").click(function(){e("body").removeClass("bg-1"),e("body").removeClass("bg-2"),e("body").removeClass("bg-3"),e("body").removeClass("bg-4"),e("body").removeClass("bg-5"),e("body").removeClass("bg-6"),e("body").removeClass("bg-7"),e("body").removeClass("bg-8"),e("body").removeClass("bg-9"),e("body").removeClass("bg-10"),e("body").addClass("bg-1"),e.cookie("mycookie","bg-1"),e(".pattern").removeClass("current"),e("#bg-1").addClass("current")}),e.cookie("mycookie")&&e("body").addClass(e.cookie("mycookie"))}),e(document).ready(function(){function s(s){e.cookie(o,s),e("head link[id=layout]").attr("href","css/layout/"+s+".css")}var o="wide";e.cookie(o)&&s(e.cookie(o)),e("#wide").click(function(){s("wide"),e("#boxed").removeClass("current"),e(this).addClass("current")}),e("#boxed").click(function(){s("boxed"),e("#wide").removeClass("current"),e(this).addClass("current")}),e("#reset").click(function(){s("wide"),e("#boxed").removeClass("current"),e("#wide").addClass("current")})}),e(document).ready(function(){function s(s){e.cookie(o,s),e("head link[id=colors]").attr("href","css/colors/"+s+".css")}var o="yellow";e.cookie(o)&&s(e.cookie(o)),e("#yellow").click(function(){s("yellow"),e(".styleswitch").removeClass("current"),e(this).addClass("current")}),e("#blue").click(function(){s("blue"),e(".styleswitch").removeClass("current"),e(this).addClass("current")}),e("#cyan").click(function(){s("cyan"),e(".styleswitch").removeClass("current"),e(this).addClass("current")}),e("#lime").click(function(){s("lime"),e(".styleswitch").removeClass("current"),e(this).addClass("current")}),e("#green").click(function(){s("green"),e(".styleswitch").removeClass("current"),e(this).addClass("current")}),e("#deeporange").click(function(){s("deeporange"),e(".styleswitch").removeClass("current"),e(this).addClass("current")}),e("#teal").click(function(){s("teal"),e(".styleswitch").removeClass("current"),e(this).addClass("current")}),e("#reset").click(function(){s("yellow"),e(".styleswitch").removeClass("current"),e("#yellow").addClass("current")})}),e(document).ready(function(){e(".switcher").animate({left:"-160px"}),e(".switcher h2 a").click(function(s){s.preventDefault();var o=e(".switcher");console.log(o.css("left")),e(".switcher").animate("-160px"===o.css("left")?{left:"0px"}:{left:"-160px"})})})}(jQuery);