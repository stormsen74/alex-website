/**
 * Created by micha on 23.12.2017.
 */


// mixitup

var itemContainer = document.querySelector('.container');
var mixerConfig = {
    animation: {
        duration: 333,
        nudge: false,
        reverseOut: false,
        easing: 'cubic-bezier(0.785, 0.135, 0.15, 0.86)',
        // effects: "fade rotateY(-90)"
        // perspectiveOrigin: '50% 50%',
        effects: 'fade scale(.2)',
        // perspectiveDistance: '1000px'
    }
}
var mixer = mixitup(itemContainer, mixerConfig);

TweenMax.set(itemContainer, {opacity: 0});
// mixer.filter('none');

function filterItems(selector) {

    currentSelector = selector;
    mixer.filter(selector).then(function (state) {
        // console.log('ready', state);
    });

    if (galleryIsOpen) gallery.close();
    if (autoSlide) stopAutoSlide();
    kontaktClose(.3);
    aboutClose(.3);
}
