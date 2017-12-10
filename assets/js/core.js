console.log('core!')

var $version = .3;

// mixitup

var itemContainer = document.querySelector('.container');
var mixerConfig = {
    animation: {
        duration: 250,
        nudge: false,
        reverseOut: false,
        effects: "fade scale(0.01)"
    }
}
var mixer = mixitup(itemContainer, mixerConfig);

// photoswipe

var pswpElement = document.querySelectorAll('.pswp')[0];
var pswp_container = document.querySelectorAll('.pswp__container')[0];

/*--------------------------------------------
 ~ getData

 //    https://medium.com/@mecrawlings/decoupled-kirby-d22416f567e9
 --------------------------------------------*/

function getData(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'kirby/projects/api', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

function onRecieve(response) {
    createItems(JSON.parse(response));
}


/*--------------------------------------------
 ~ create Items
 --------------------------------------------*/

function createItem(itemData) {

    var item = document.createElement('div');
    item.classList.add('item', 'mix', 'soft-shadow', itemData['category']);
    item.images = itemData['images'];

    // set first image as item image
    var imagePath = item.images[0][0] + "/" + item.images[0][1];
    var image = document.createElement("img");
    image.setAttribute("src", imagePath);
    // TweenMax.delayedCall(1, function () {console.log(image.naturalWidth)})

    var overlay = document.createElement("div");
    overlay.classList.add('overlay', 'soft-inset');

    var description = document.createElement("div");
    description.classList.add('description');

    var title = document.createElement("div");
    title.classList.add('item-title');

    var text = document.createElement("div");
    text.classList.add('item-text');

    var area = document.createElement("div");
    area.classList.add('area');

    title.innerHTML = itemData['title'];
    text.innerHTML = itemData['text'];

    description.appendChild(title);
    description.appendChild(text);
    overlay.appendChild(description);
    item.appendChild(image);
    item.appendChild(overlay);
    item.appendChild(area);

    return item;
}


function createKontakt() {
    var content = document.createElement('div');
    content.classList.add('mix', 'content');
    content.id = 'content-kontakt';

    var contentBox = document.createElement('div');
    contentBox.classList.add('content-box');

    var textArea = document.createElement('div');
    textArea.innerHTML = 'Alexander Joly<br/>Schadesweg 27a<br/>20537 Hamburg<br/> <br/>mail@alexanderjoly.de<br/> +49 178 873 0876<br/> <br/>Alexander Joly arbeitet im Feld von ea nonsequia nis eost ani sa dolorio ribusandis sed que eum eume ne simolo tota conest utet et aut int esciateni ut qui comnis nis esequis siminti nvellab idi bea volupta de volupta spercil inienda eptinul paruptatio teniend ucipsundam rehenis ciisimu sdandusdam nos simenda ndipsae. Itatumq uiatusam voluptatur? Urernatur mil ea core sitaquntibusant ant vendend aecus, in ea reratem. Iquas es iunt, solupta tibusda nihitist magnatibus voluptaquenon nos est minis moloreri optat omnis qui iurestiur anto to qui te aut maximporaes preiunt occab.'

    var closeButton = document.createElement('div');
    closeButton.classList.add('close-button');
    closeButton.id = 'close-kontakt';
    closeButton.addEventListener('click', onCloseKontakt);

    contentBox.appendChild(textArea);
    contentBox.appendChild(closeButton);
    content.appendChild(contentBox)

    return content

}

function createItems(data) {

    for (var i = 0; i < data.length; i++) {
        mixer.append(createItem(data[i]), false)
    }

    for (var g = 1; g <= 3; g++) {
        var gap = document.createElement("div");
        gap.classList.add('gap');
        itemContainer.appendChild(gap);
    }


    initItemListener()
}


function initItemListener() {
    var areas = document.getElementsByClassName('area');
    for (var i = 0; i < areas.length; i++) {
        areas[i].addEventListener('click', function (event) {
            buildGallery(event.target.parentElement.images)
        });
    }
}

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

    console.log('build', _images)

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


    var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, gallery_options);


    gallery.listen('beforeChange', function () {
    });

    gallery.listen('afterChange', function () {
        // pswp_container.style.opacity = .0;
    });


    gallery.init();
};


/*--------------------------------------------
 ~
 --------------------------------------------*/

window.addEventListener("resize", onResize);

// NAV-TOGGLE

var menueBar = document.getElementById('menueBar');
var mobileSelection = document.getElementById('mobileSelection');
var toggleIcon = document.getElementById('toggleIcon');

var isMobileSelect = false;
toggleIcon.addEventListener('click', onMobileSelectToggle);


function onResize(e) {
    if (window.innerWidth > 768 && isMobileSelect) {
        hideMobileSelect();
    }
}

function onMobileSelectToggle(e) {
    !isMobileSelect ? showMobileSelect() : hideMobileSelect();
}

function showMobileSelect() {
    isMobileSelect = true;
    TweenMax.to(menueBar, .3, {height: 95, ease: Expo.easeOut});
    TweenMax.to(mobileSelection, .3, {delay: .1, display: 'block', opacity: 1, ease: Sine.easeOut});
    TweenMax.set(toggleIcon, {backgroundPosition: '-26px 0px'});
}

function hideMobileSelect() {
    isMobileSelect = false;
    TweenMax.to(menueBar, .2, {height: 60, ease: Sine.easeOut});
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
}

function onHoverOutDesktopSelect(e) {
    if (!e.target.classList.contains('active')) {
        TweenMax.to(e.target, .5, {opacity: .5, ease: Sine.easeOut})
    }
}

function setPassive() {
    for (var i = 0; i < desktopSelectButtons.length; i++) {
        TweenMax.set(desktopSelectButtons[i], {opacity: .5})
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

        var selector = e.target.dataset.type;
        filterItems(selector);
    }
}

function filterItems(selector, contentID) {
    contentID = contentID || null;
    if (contentID == null) {
        currentSelector = selector;
        if (document.getElementById('content-kontakt')) {
            kontaktButton.classList.remove('active');
            kontaktButton.classList.remove('hover');
            mixer.remove(document.getElementById('content-kontakt'), false);
        }
    }
    mixer.filter(selector).then(function (state) {
        // console.log('ready', state)
        if (contentID != null) {
            if (contentID == 'kontakt') {
                kontaktButton.classList.add('active');
                mixer.append(createKontakt(), false);
                TweenMax.to(document.getElementById('content-kontakt'), .5, {display: 'block', opacity: 1, ease: Sine.easeOut})
            }
        }
    });
}

// CONTENT

var kontaktButton = document.getElementById('kontakt');
kontaktButton.addEventListener('mouseover', onHoverKontakt);
kontaktButton.addEventListener('mouseout', onHoverOutKontakt);
kontaktButton.addEventListener('click', onClickKontakt);

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
        kontaktButton.classList.remove('hover');
        filterItems('none', 'kontakt')
    }
}

function onCloseKontakt() {
    TweenMax.to(document.getElementById('content-kontakt'), .3, {
        display: 'none', opacity: 0, ease: Cubic.easeIn, onComplete: function () {
            kontaktButton.classList.remove('active');
            kontaktButton.classList.remove('hover');
            mixer.remove(document.getElementById('content-kontakt'), false);
            filterItems(currentSelector);
        }
    })
}


/*--------------------------------------------
 ~ init
 --------------------------------------------*/

getData(onRecieve);

