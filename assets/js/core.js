console.log('core!')

var $version = .3;

// mixitup

var itemContainer = document.querySelector('.container');
var mixer = mixitup(itemContainer);

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


/*--------------------------------------------
 ~ init
 --------------------------------------------*/

getData(onRecieve);


