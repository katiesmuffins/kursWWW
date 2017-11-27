'use strict';

$(function() {

    //configuration
    var width = 800;
    var animationSpeed = 1000;
    var pause = 3000;
    var currentSlide = 1;

    var $slider = $('#slider');
    var $slideContainer = $slider.find('.slides'); //when I find div slider, I look for ul class "slider"
    var $slides = $slideContainer.find('.slide'); // exacly the same as earlier but with every li element

    var interval;

    //startSlider is a function which goes when I open my page 

    function startSlider() {
        interval = setInterval(function() {
            $slideContainer.animate({ 'margin-left': '-=' + width }, animationSpeed, function() {
                if (++currentSlide === $slides.length) {
                    currentSlide = 1;
                    $slideContainer.css('margin-left', 0);
                } // I want to slide to first slide when I am out of slides, so when the last slide ends I back to ther first
                //and start again
            });
        }, pause);
    }

    //stopSlider is a function which goes when I put mouse on picture

    function stopSlider() {
        clearInterval(interval);
    }

    $slideContainer.on('mouseenter', stopSlider).on('mouseleave', startSlider);

    startSlider();

});