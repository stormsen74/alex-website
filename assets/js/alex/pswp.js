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

var buildGallery = function (_images) {
    // console.log('buildGallery', _images, type)

    if (mobile) {
        kontaktClose(.5);
        aboutClose(.5);
    }

    pswpElement.style.display = 'block';

    var items = [];
    var _tempTitle = '';
    var _tempDescription = '';
    var text = '';

    for (var i = 0; i < _images.length; i++) {

        if (i == 0) {
            if (_images[i][3] != '') _tempTitle = _images[i][3];
            if (_images[i][4] != '') _tempDescription = _images[i][4];
            text = '<div>' + _images[i][3] + '</div><div style="font-size: 1.2rem">' + _images[i][4].replace(/\n/g, "<br/>") + '</div>';
        } else {
            if (_images[i][3] == '' && _images[i][4] == '' && _tempTitle != '' && _tempDescription != '') {
                text = '<div>' + _tempTitle + '</div><div style="font-size: 1.2rem">' + _tempDescription.replace(/\n/g, "<br/>") + '</div>';
            } else {
                text = '<div>' + _images[i][3] + '</div><div style="font-size: 1.2rem">' + _images[i][4].replace(/\n/g, "<br/>") + '</div>';
            }

        }

        var o = {
            src: _images[i][0] + "/" + _images[i][1],
            w: _images[i][2][0],
            h: _images[i][2][1],
            title: text
        };
        items.push(o)
    }


    gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, gallery_options);

    gallery.listen('preventDragEvent', function (e, isDown, preventObj) {
        if (isMobileSelect) hideMobileSelect();
        preventObj.prevent = true;
    });

    gallery.listen('close', function () {
        TweenMax.set(['html', 'body'], {overflow: 'visible'});
        galleryIsOpen = false;
    });


    gallery.init();

    galleryIsOpen = true;
    TweenMax.set(['html', 'body'], {overflow: 'hidden'});
    TweenMax.set(['.pswp__caption'], {opacity: 1});

    TweenMax.delayedCall(.05, function () {
        gallery.updateSize(true);
    });

    hideMobileSelect();
    setLightboxHeight();
    kontaktClose();
    aboutClose();
};
