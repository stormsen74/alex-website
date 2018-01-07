console.log('core!')

var $version = .3;
var mobileNav = false;
var mobileNavSwitch = 600;
var isInitial = true;


/*--------------------------------------------
 ~ getItemData
 --------------------------------------------*/

function getItemData(callback) {

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

var items;

function createItem(itemData) {

    var item = document.createElement('div');
    item.classList.add('item', 'mix', itemData['category']);
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

    checkMobile();
    console.log(mobileNav)
    items = Array.from(document.getElementsByClassName('area'));

    items.forEach(function (area) {
        area.itemData = {
            overlay: area.parentElement.childNodes[1],
            description: area.parentElement.childNodes[1].childNodes[0],
            overlay_height: area.parentElement.childNodes[1].getBoundingClientRect().height
        };


        area.addEventListener('click', function (event) {
            buildGallery(event.target.parentElement.images)
        });

        if (!mobile) {
            area.addEventListener('mouseover', function (event) {
                TweenMax.to(this.itemData.overlay, .4, {
                    height: '100%',
                    backgroundColor: 'rgba(247, 247, 247, 0.85)',
                    ease: Power2.easeInOut
                });

                TweenMax.to(this.itemData.description, .4, {
                    top: '35%',
                    ease: Power2.easeInOut
                })
            });
            area.addEventListener('mouseout', function (event) {
                TweenMax.to(this.itemData.overlay, .4, {
                    height: this.itemData.overlay_height,
                    backgroundColor: 'rgba(247, 247, 247, 0.63)',
                    ease: Power3.easeInOut
                });

                TweenMax.to(this.itemData.description, .4, {
                    top: '0%',
                    ease: Power3.easeInOut
                })
            });
        }
    });

    getKontaktData(onRecieveKontaktData);
    getAboutData(onRecieveAboutData);

}

/*--------------------------------------------
 ~ getKontaktData
 --------------------------------------------*/

function getKontaktData(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'kirby/kontakt/api', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

function onRecieveKontaktData(response) {
    createKontakt(JSON.parse(response));
}

function createKontakt(kontaktData) {

    console.log(kontaktData[0]);

    var scrollContainer = document.getElementById('scroll-kontakt');
    TweenMax.set(scrollContainer, {y: 20});
    Draggable.create(scrollContainer, {type: "y", bounds: '#bounds-kontakt', edgeResistance: .75, throwProps: true});
    scrollContainer.addEventListener('touchmove', function (e) {
        e.preventDefault();
    }, false);

    document.getElementById('kontakt-adress').innerHTML = kontaktData[0]['adress'].replace(/\n/g, "<br/>");

    document.getElementById('kontakt-mail').setAttribute("href", 'mailto:' + kontaktData[0]['mail']);
    document.getElementById('kontakt-mail').innerHTML = kontaktData[0]['mail'];

    document.getElementById('kontakt-phone').innerHTML = kontaktData[0]['phone'];
    document.getElementById('kontakt-werkstatt').innerHTML = kontaktData[0]['adress_work'].replace(/\n/g, "<br/>");

    document.getElementById('kontakt-url').setAttribute("href", kontaktData[0]['url_work']);
    document.getElementById('kontakt-url').innerHTML = kontaktData[0]['url_work'];

}

/*--------------------------------------------
 ~ getAboutData
 --------------------------------------------*/

function getAboutData(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'kirby/about/api', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

function onRecieveAboutData(response) {
    createAbout(JSON.parse(response));
}

function createAbout(aboutData) {
    console.log(aboutData[0]);

    var containerAbout = document.getElementById('scroll-about');
    TweenMax.set(containerAbout, {y: 20});
    Draggable.create(containerAbout, {type: "y", bounds: '#bounds-about', edgeResistance: .75, throwProps: true});
    containerAbout.addEventListener('touchmove', function (e) {
        e.preventDefault();
    }, false);

    document.getElementById('about-text').innerHTML = aboutData[0]['text'].replace(/\n/g, "<br/>");
    var imagePath = aboutData[0]['path'] + "/" + aboutData[0]['image'];
    document.getElementById('about-image').setAttribute("src", imagePath);

}


/*--------------------------------------------
 ~
 --------------------------------------------*/

window.addEventListener("resize", onResize);

function onResize(e) {

    if (isInitial) {
        setLogo()
    }

    checkMobile();
    checkContentOverflow();

    if (mobileNav && isMobileSelect) {
        hideMobileSelect();
    }

    !lightbox.classList.contains('pswp--fs') ? adaptLightbox() : adaptLightbox(true)

}

function setLogo() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    var logoWidth = document.getElementById('logo').getBoundingClientRect().width;
    var logoHeight = document.getElementById('logo').getBoundingClientRect().height;

    TweenMax.set(document.getElementById('logo'), {
        left: w * .5 - logoWidth * .5,
        top: h * .5 - logoHeight * .6
    });

}

function checkMobile() {
    if (window.innerWidth < mobileNavSwitch) {
        if (!mobileNav) mobileNav = true
    } else {
        if (mobileNav) mobileNav = false
    }
}


function checkContentOverflow() {
    var scrollAbout = document.getElementById('scroll-about');
    var scrollKontakt = document.getElementById('scroll-kontakt');
    var diffAbout = window.innerHeight - menueBarSize.defaultHeight - scrollAbout.getBoundingClientRect().height;
    var diffKontakt = window.innerHeight - menueBarSize.defaultHeight - scrollKontakt.getBoundingClientRect().height;

    diffAbout <= 0 ?
        TweenMax.set('#bounds-about', {height: window.innerHeight - menueBarSize.defaultHeight}) :
        TweenMax.set('#bounds-about', {height: scrollAbout.getBoundingClientRect().height})

    diffKontakt <= 0 ?
        TweenMax.set('#bounds-kontakt', {height: window.innerHeight - menueBarSize.defaultHeight}) :
        TweenMax.set('#bounds-kontakt', {height: scrollKontakt.getBoundingClientRect().height})
}

/*--------------------------------------------
 ~ init
 --------------------------------------------*/

function buildLogo() {
    TweenMax.set('#path_a', {drawSVG: '0% 0%'});
    TweenMax.set('#path_j', {drawSVG: '0% 0%'});
    TweenMax.set(document.getElementById('logo'), {display: 'block'})
    setLogo();

    TweenMax.to('#path_a', 1.5, {delay: 0, drawSVG: '0% 100%', ease: Cubic.easeInOut});
    TweenMax.to('#path_j', 1.5, {delay: .3, drawSVG: '0% 100%', ease: Cubic.easeInOut});

    TweenMax.to(menueBar, .4, {delay: 1.63, top: 0, ease: Sine.easeOut});

    TweenMax.delayedCall(2, viewContents)
}

function viewContents() {

    // mixer.filter('none');

    TweenMax.to('#layer-start', 1, {delay: 0, autoAlpha: 0, ease: Sine.easeInOut});
    TweenMax.to('#path_a', .5, {delay: 0, drawSVG: '0% 0%', ease: Cubic.easeOut});
    TweenMax.to('#path_j', .5, {delay: 0, drawSVG: '0% 0%', ease: Cubic.easeOut});
    TweenMax.delayedCall(.5, function () {
        TweenMax.set(['html', 'body'], {overflow: 'visible'});
        TweenMax.to(itemContainer, .5, {opacity: 1, ease: Sine.easeOut});
        // mixer.filter('all');

        isInitial = false;
    })
}

var mobile = isMobile.any;

getItemData(onRecieve);

buildLogo();


