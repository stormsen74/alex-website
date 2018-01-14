/**
 * Created by micha on 23.12.2017.
 */

// photoswipe

var pswpElement = document.querySelectorAll('.pswp')[0];
var pswp_container = document.querySelectorAll('.pswp__container')[0];
var lightbox = document.getElementById('lightbox');
var gallery;
var galleryIsOpen = false;
var autoSlide = false;
var autoSlideDelay = 4.5;

/*--------------------------------------------
 ~ gallery

 https://stackoverflow.com/questions/28214038/photoswipe-4-0-initiate-swipe-to-next-programatically
 --------------------------------------------*/

var gallery_options = {
    history: false,
    focus: false,
    showAnimationDuration: 0,
    hideAnimationDuration: 0,
    showHideOpacity: true,
    closeOnScroll: false,
    closeOnVerticalDrag: false
};

var initialSlideLoaded = false;


var buildGallery = function (_images, type) {
    console.log('buildGallery', _images, type)

    if (mobile) {
        kontaktClose(.5);
        aboutClose(.5);
    }


    pswpElement.style.display = 'block';

    var items = [];
    for (var i = 0; i < _images.length; i++) {
        var text = '<div>' + _images[i][3] + '</div><div style="font-size: 1.2rem">' + _images[i][4] + '</div>';
        // console.log('-', _images[i][2][0], _images[i][2][1]);
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

        if (type == 'initial' && autoSlide) {
            TweenMax.set(gallery.currItem.container, {opacity: 0});
            TweenMax.to(gallery.currItem.container, .5, {opacity: 1, ease: Sine.easeOut});
        }
    });

    gallery.listen('preventDragEvent', function (e, isDown, preventObj) {
        // e - original event
        // isDown - true = drag start, false = drag release

        if (autoSlide) stopAutoSlide();
        if (isMobileSelect) hideMobileSelect();

        // Line below will force e.preventDefault() on:
        // touchstart/mousedown/pointerdown events
        // as well as on:
        // touchend/mouseup/pointerup events
        preventObj.prevent = true;
    });

    gallery.listen('imageLoadComplete', function (index, item) {
        // index - index of a slide that was loaded
        // item - slide object

        if (type == 'initial' && index == 1) {
            initialSlideLoaded = true;
        }

    });


    gallery.listen('close', function () {
        TweenMax.set(['html', 'body'], {overflow: 'visible'});
        galleryIsOpen = false;
        stopAutoSlide();
    });


    gallery.init();
    galleryIsOpen = true;
    TweenMax.set(['html', 'body'], {overflow: 'hidden'});
    hideMobileSelect();
    adaptLightbox();


};


function startAutoSlide() {
    TweenMax.delayedCall(autoSlideDelay, autoStep)
    autoSlide = true;
}

function autoStep() {
    gallery.next();
    TweenMax.delayedCall(autoSlideDelay, autoStep)
}

function stopAutoSlide() {
    TweenMax.killDelayedCallsTo(autoStep);
    autoSlide = false;
}


function adaptLightbox(fs) {

    fs = fs || false;

    // console.log('adaptLightbox', fs)

    if (!fs) {
        TweenMax.set(lightbox, {top: 60, height: window.innerHeight - 60});
    } else {
        TweenMax.set(lightbox, {top: 0, delay: .1, height: window.innerHeight})
    }

};
