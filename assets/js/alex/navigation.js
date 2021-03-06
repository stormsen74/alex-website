/**
 * Created by micha on 23.12.2017.
 */


// NAV-TOGGLE

var menueBar = document.getElementById('menueBar');
var mobileSelection = document.getElementById('mobileSelection');
var toggleIcon = document.getElementById('toggleIcon');

var menueBarSize = {
    defaultHeight: 60,
    toggleHeight: 95
};


var isMobileSelect = false;
toggleIcon.addEventListener('click', onMobileSelectToggle);


function onMobileSelectToggle(e) {
    !isMobileSelect ? showMobileSelect() : hideMobileSelect();
}

function showMobileSelect() {
    isMobileSelect = true;
    TweenMax.to(menueBar, .3, {height: menueBarSize.toggleHeight, ease: Expo.easeOut});
    TweenMax.to(mobileSelection, .3, {delay: .1, display: 'block', opacity: 1, ease: Sine.easeOut});
    TweenMax.set(toggleIcon, {backgroundPosition: '-26px 0px'});
}


function hideMobileSelect() {
    isMobileSelect = false;
    TweenMax.to(menueBar, .2, {height: menueBarSize.defaultHeight, ease: Sine.easeOut});
    TweenMax.set(mobileSelection, {display: 'none', opacity: 0});
    TweenMax.set(toggleIcon, {backgroundPosition: '0px 0px'});
}

// SELECT-NAVIGATION

var desktopSelectButtons = document.getElementsByClassName('desktop-select');
var mobileSelectButtons = document.getElementsByClassName('nav-item-mobile');
var currentSelector = 'all';

for (var i = 0; i < desktopSelectButtons.length; i++) {
    desktopSelectButtons[i].addEventListener('click', onClickDesktopSelect);
    desktopSelectButtons[i].addEventListener('mouseover', onHoverDesktopSelect);
    desktopSelectButtons[i].addEventListener('mouseout', onHoverOutDesktopSelect);

    mobileSelectButtons[i].addEventListener('click', onClickMobileSelect);

    desktopSelectButtons[i].id = mobileSelectButtons[i].id = i;
}


function onHoverDesktopSelect(e) {
    if (!e.target.classList.contains('active')) {
        TweenMax.to(e.target, .4, {opacity: 1, ease: Cubic.easeOut})
    }

    if (e.target.id > 0 && currentSelector == 'all') {
        fadeUnselectedItems(e.target.dataset.type);
    }
}

function onHoverOutDesktopSelect(e) {
    if (!e.target.classList.contains('active')) {
        TweenMax.to(e.target, .5, {opacity: .5, ease: Sine.easeOut})
    }

    if (e.target.id > 0) {
        showAllItems();
    }
}

function setPassive() {
    for (var i = 0; i < desktopSelectButtons.length; i++) {
        TweenMax.set(desktopSelectButtons[i], {opacity: .5});
        desktopSelectButtons[i].classList.remove('active');
        mobileSelectButtons[i].classList.remove('active');
    }
}

function onClickDesktopSelect(e) {
    if (!e.target.classList.contains('active')) {
        setPassive();
        e.target.classList.add('active');
        TweenMax.to(e.target, .4, {opacity: 1, ease: Cubic.easeOut});
        mobileSelectButtons[e.target.id].classList.add('active');

        var selector = e.target.dataset.type;
        filterItems(selector);
    }
}

function onClickMobileSelect(e) {
    if (!e.target.classList.contains('active')) {
        setPassive();
        e.target.classList.add('active');
        desktopSelectButtons[e.target.id].classList.add('active');
        TweenMax.to(desktopSelectButtons[e.target.id], .4, {opacity: 1, ease: Cubic.easeOut});
        hideMobileSelect();

        var selector = e.target.dataset.type;
        filterItems(selector);
    }
}


function fadeUnselectedItems(selector) {
    var all = Array.from(itemContainer.querySelectorAll('.mix'));

    all.forEach(function (element) {
        if (!element.classList.contains(selector.substr(1))) {
            TweenMax.to(element, .3, {opacity: .3, ease: Cubic.easeOut})
        }
    });

}

function showAllItems() {
    var all = Array.from(itemContainer.querySelectorAll('.mix'));

    all.forEach(function (element) {
        TweenMax.to(element, .3, {opacity: 1, ease: Sine.easeIn})
    });

}


// CONTENT->KONTAKT

var kontaktButton = document.getElementById('kontakt');
kontaktButton.addEventListener('mouseover', onHoverKontakt);
kontaktButton.addEventListener('mouseout', onHoverOutKontakt);
kontaktButton.addEventListener('click', onClickKontakt);

var contentKontakt = document.getElementById('content-kontakt');
var closeKontakt = document.getElementById('close-kontakt');
closeKontakt.addEventListener('click', onCloseKontakt);

function onHoverKontakt(e) {
    if (!e.target.classList.contains('active')) {
        TweenMax.to(e.target, .3, {className: "+=hover", ease: Sine.easeOut})
    }
}

function onHoverOutKontakt(e) {
    if (!e.target.classList.contains('active')) {
        TweenMax.to(e.target, .4, {className: "-=hover", ease: Cubic.easeOut})
    }
}

function onClickKontakt(e) {
    if (!e.target.classList.contains('active')) {
        viewKontakt();
    } else {
        kontaktClose();
    }
}

function viewKontakt() {
    setContentHeight();
    if (window.innerWidth > window.innerHeight && mobile) {
        TweenMax.set(scrollContainer, {height: 200});
        draggable[0].applyBounds({minX: 0, minY: -50, maxX: 0, maxY: 10});
        TweenMax.set(imprintButton, {display: 'none'})
    } else {
        TweenMax.set(imprintButton, {display: 'block'})
    }

    kontaktButton.classList.remove('hover');
    kontaktButton.classList.add('active');

    TweenMax.set(contentKontakt, {right: '-100%', display: 'block', opacity: 1})
    TweenMax.to(contentKontakt, .5, {
        right: '0%', ease: Cubic.easeOut, onComplete: function () {
            if (mobileNav) {
                TweenMax.set('.container', {display: 'none'})
            }
        }
    });

    aboutClose(.25);
    TweenMax.set('#scroll-kontakt', {y: 20});
    checkContentOverflow();

}

function onCloseKontakt() {
    kontaktClose();
}

function kontaktClose(t) {
    t = t || .4;

    kontaktButton.classList.remove('active');
    kontaktButton.classList.remove('hover');

    TweenMax.to(contentKontakt, t, {
        right: '-100%', ease: Cubic.easeInOut, onComplete: function () {
            TweenMax.set(contentKontakt, {display: 'none'})
            closeImprint();
        }
    });

    TweenMax.set('.container', {display: 'block'})

}

// CONTENT->ABOUT

var aboutButton = document.getElementById('about');
aboutButton.addEventListener('mouseover', onHoverAbout);
aboutButton.addEventListener('mouseout', onHoverOutAbout);
aboutButton.addEventListener('click', onClickAbout);

var contentAbout = document.getElementById('content-about');
var closeAbout = document.getElementById('close-about');
closeAbout.addEventListener('click', onCloseAbout);

function onHoverAbout(e) {
    if (!e.target.classList.contains('active')) {
        TweenMax.to(e.target, .3, {className: "+=hover", ease: Sine.easeOut})
    }
}

function onHoverOutAbout(e) {
    if (!e.target.classList.contains('active')) {
        TweenMax.to(e.target, .4, {className: "-=hover", ease: Cubic.easeOut})
    }
}

function onClickAbout(e) {
    if (!e.target.classList.contains('active')) {
        viewAbout();
    } else {
        aboutClose();
    }
}

function viewAbout() {
    setContentHeight();

    aboutButton.classList.remove('hover');
    aboutButton.classList.add('active');

    TweenMax.set(contentAbout, {left: '-100%', display: 'block', opacity: 1})
    TweenMax.to(contentAbout, .5, {left: '0%', ease: Cubic.easeOut})

    kontaktClose(.25);
    TweenMax.set('#scroll-about', {y: 20});
    checkContentOverflow();
}

function onCloseAbout() {
    aboutClose();
}

function aboutClose(t) {
    t = t || .4;

    aboutButton.classList.remove('active');
    aboutButton.classList.remove('hover');

    TweenMax.to(contentAbout, t, {
        left: '-100%', ease: Cubic.easeInOut, onComplete: function () {
            TweenMax.set(contentAbout, {display: 'none'})
        }
    })
}