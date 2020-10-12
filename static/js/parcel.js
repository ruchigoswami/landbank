$(document).ready(function(){
	"use strict";

	/* 

	1. Vars and Inits

	*/

	var header = $('.header');
	
	setHeader();

	$(window).on('resize', function()
	{
		setHeader();

		setTimeout(function()
		{
			$(window).trigger('resize.px.parallax');
		}, 375);
	});

	$(document).on('scroll', function()
	{
		setHeader();
	});

	/* 

	2. Set Header

	*/

	function setHeader()
	{
		if($(window).scrollTop() > 91)
		{
			header.addClass('scrolled');
		}
		else
		{
			header.removeClass('scrolled');
		}
	}

	/* 

	3. Init Menu

	*/

	function initMenu()
	{
		if($('.menu').length && $('.hamburger').length)
		{
			var menu = $('.menu');
			var hamburger = $('.hamburger');
			var close = $('.menu_close');
			var superOverlay = $('.super_overlay');

			hamburger.on('click', function()
			{
				menu.toggleClass('active');
				superOverlay.toggleClass('active');
			});

			close.on('click', function()
			{
				menu.toggleClass('active');
				superOverlay.toggleClass('active');
			});

			superOverlay.on('click', function()
			{
				menu.toggleClass('active');
				superOverlay.toggleClass('active');
			});
		}
	}




	// IMAGE SLIDES & CIRCLES ARRAYS, & COUNTER
	var imageSlides = document.getElementsByClassName('imageSlides');
	var circles = document.getElementsByClassName('circle');
	var leftArrow = document.getElementById('leftArrow');
	var rightArrow = document.getElementById('rightArrow');
	var counter = 0;

	// HIDE ALL IMAGES FUNCTION
	function hideImages() {
	for (var i = 0; i < imageSlides.length; i++) {
		imageSlides[i].classList.remove('visible');
	}
	}

	// REMOVE ALL DOTS FUNCTION
	function removeDots() {
	for (var i = 0; i < imageSlides.length; i++) {
		circles[i].classList.remove('dot');
	}
	}

	// SINGLE IMAGE LOOP/CIRCLES FUNCTION
	function imageLoop() {
	var currentImage = imageSlides[counter];
	var currentDot = circles[counter];
	currentImage.classList.add('visible');
	removeDots();
	currentDot.classList.add('dot');
	counter++;
	}

	// LEFT & RIGHT ARROW FUNCTION & CLICK EVENT LISTENERS
	function arrowClick(e) {
	var target = e.target;
	if (target == leftArrow) {
		clearInterval(imageSlideshowInterval);
		hideImages();
		removeDots();
		if (counter == 1) {
		counter = (imageSlides.length - 1);
		imageLoop();
		imageSlideshowInterval = setInterval(slideshow, 10000);
		} else {
		counter--;
		counter--;
		imageLoop();
		imageSlideshowInterval = setInterval(slideshow, 10000);
		}
	} 
	else if (target == rightArrow) {
		clearInterval(imageSlideshowInterval);
		hideImages();
		removeDots();
		if (counter == imageSlides.length) {
		counter = 0;
		imageLoop();
		imageSlideshowInterval = setInterval(slideshow, 10000);
		} else {
		imageLoop();
		imageSlideshowInterval = setInterval(slideshow, 10000);
		}
	}
	}

	leftArrow.addEventListener('click', arrowClick);
	rightArrow.addEventListener('click', arrowClick);


	// IMAGE SLIDE FUNCTION
	function slideshow() {
	if (counter < imageSlides.length) {
		imageLoop();
	} else {
		counter = 0;
		hideImages();
		imageLoop();
	}
	}

	// SHOW FIRST IMAGE, & THEN SET & CALL SLIDE INTERVAL
	setTimeout(slideshow, 1000);
	var imageSlideshowInterval = setInterval(slideshow, 10000);


	$(".display_more").click(function(){
		$(".more_features").slideToggle();
	});
	});


	function myMap() {
		var lat = parseFloat($('#langLat').attr('lat'));
		var lang = parseFloat($('#langLat').attr('lang'));
		var address1 = $('#address').attr('address1');
		var address2 = $('#address').attr('address2');
		var owner = $('#address').attr('owner');
		var zip = $('#address').attr('zip');
		
		var content = '<div>'+
						'<h6>'+owner+'</h6>'+
						'<div>'+address1+'</div>'+
						'<div>'+address2+'</div>'+
						'<div>'+zip+'</div>'+
					'</div>';


		const propLocation = { lat: lat, lng: lang };
		const map = new google.maps.Map(document.getElementById("map"), {
		scaleControl: true,
		center: propLocation,
		zoom: 10,
		});
		var infowindow = new google.maps.InfoWindow({
			content: content,
		
			// Assign a maximum value for the width of the infowindow allows
			// greater control over the various content elements
			maxWidth: 350
		});
		const marker = new google.maps.Marker({ map, position: propLocation });
		marker.addListener("click", () => {
		infowindow.open(map, marker);
		});
		
		
	}
