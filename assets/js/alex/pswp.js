/**
 * Created by micha on 23.12.2017.
 */

// photoswipe

var pswpElement = document.querySelectorAll('.pswp')[0];
var pswp_container = document.querySelectorAll('.pswp__container')[0];
var lightbox = document.getElementById('lightbox');
var gallery;
var galleryIsOpen = false;

/*--------------------------------------------
 ~ gallery

 https://stackoverflow.com/questions/28214038/photoswipe-4-0-initiate-swipe-to-next-programatically
 --------------------------------------------*/

var gallery_options = {
    history: false,
    focus: false,
    showAnimationDuration: 0,
    hideAnimationDuration: 0,
    showHideOpacity: true
};


var buildGallery = function (_images) {

    kontaktClose(.6);
    aboutClose(.6);


    pswpElement.style.display = 'block';

    var items = [];
    for (var i = 0; i < _images.length; i++) {
        var text = '<div>' + _images[i][3] + '</div><div style="font-size: 1.2rem">' + _images[i][4] + '</div>';
        console.log('-', _images[i][2][0], _images[i][2][1]);
        var o = {
            src: _images[i][0] + "/" + _images[i][1],
            w: _images[i][2][0],
            h: _images[i][2][1],
            title: text
        };
        items.push(o)
    }


    gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, gallery_options);


    gallery.listen('beforeChange', function () {
        // console.log(gallery.currItem.container.parentNode.style.transform);
        // gallery.currItem.container.parentNode.style.transform = 'translate3d(0, 0, 0)';
        // console.log(gallery.currItem.container.parentNode.style.transform);

    });

    gallery.listen('afterChange', function () {
        // console.log(gallery.currItem.container.parentNode.style.transform);
        // console.log(gallery.currItem.container.parentNode)
        // TweenMax.set(gallery.currItem.container, {opacity: 0});
        // TweenMax.to(gallery.currItem.container, .3, {opacity: 1, ease: Sine.easeOut});
    });

    gallery.listen('preventDragEvent', function (e, isDown, preventObj) {
        // e - original event
        // isDown - true = drag start, false = drag release

        if (isMobileSelect) hideMobileSelect();

        // Line below will force e.preventDefault() on:
        // touchstart/mousedown/pointerdown events
        // as well as on:
        // touchend/mouseup/pointerup events
        preventObj.prevent = true;
    });


    gallery.listen('close', function () {
        galleryIsOpen = false;
    });


    gallery.init();
    galleryIsOpen = true;
    hideMobileSelect();
    adaptLightbox();



};


function adaptLightbox(fs) {

    fs = fs || false;

    console.log('adaptLightbox', fs)

    if (!fs) {
        TweenMax.set(lightbox, {top: 60, height: window.innerHeight - 60});
    } else {
        TweenMax.set(lightbox, {top: 0, delay: .1, height: window.innerHeight})
    }

};
