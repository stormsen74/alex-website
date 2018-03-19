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
var maxImages = 0;
var imagesLoaded = false;

function createItem(itemData, index) {

    var item = document.createElement('div');
    item.classList.add('item', 'mix', itemData['category']);
    item.images = itemData['images'];

    // set first image as item image
    var imagePath = item.images[0][0] + "/" + item.images[0][1];
    var image = document.createElement("img");
    image.setAttribute("src", imagePath);
    image.onload = function () {
        // console.log("image is loaded", index, index == maxImages);
        if (index == maxImages) imagesLoaded = true;
        // console.log('imagesLoaded', imagesLoaded)
    }
    // TweenMax.delayedCall(1, function () {console.log(image.naturalWidth)})

    var overlay = document.createElement("div");
    overlay.classList.add('overlay');

    var description = document.createElement("div");
    description.classList.add('description');

    var title = document.createElement("div");
    title.classList.add('item-title');

    var text = document.createElement("div");
    text.classList.add('item-text');

    var area = document.createElement("div");
    area.classList.add('area');

    title.innerHTML = itemData['title'].replace(/\n/g, "<br/>");

    text.innerHTML = itemData['text'].replace(/\n/g, "<br/>");


    description.appendChild(title);
    description.appendChild(text);
    overlay.appendChild(description);
    item.appendChild(image);
    item.appendChild(overlay);
    item.appendChild(area);

    return item;
}

function createItems(data) {

    // for (var i = maxImages; i >= 0; i--) {
    //     reversed.push(data[i])
    // }
    // reversed.sort(function(b, a) {
    //     return a.year - b.year;
    // });
    //
    // for (var j = 0; j < reversed.length; j++) {
    //     mixer.append(createItem(reversed[j], j), false)
    // }

    maxImages = data.length - 1;
    for (var i = 0; i < data.length; i++) {
        mixer.append(createItem(data[i], i), false)
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
    items = Array.from(document.getElementsByClassName('area'));

    items.forEach(function (area) {
        area.itemData = {
            image: area.parentElement.childNodes[0],
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
                    color: '#101010',
                    textShadow: '0 0 0px #101010',
                    ease: Cubic.easeOut
                });

                TweenMax.to(this.itemData.image, .5, {
                    opacity: .45,
                    ease: Sine.easeInOut
                });

                TweenMax.to(this.itemData.image, .6, {
                    '-webkit-filter': 'blur(1px)',
                    'filter': 'blur(1px)',
                    ease: Power3.easeOut
                });
            });
            area.addEventListener('mouseout', function (event) {
                TweenMax.to(this.itemData.overlay, .4, {
                    color: '#ffffff',
                    textShadow: '0 0 3px #101010',
                    ease: Sine.easeOut
                });

                TweenMax.to(this.itemData.image, .5, {
                    opacity: 1,
                    '-webkit-filter': 'blur(0px)',
                    'filter': 'blur(0px)',
                    ease: Sine.easeInOut
                });
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

var draggable;
var scrollContainer;
function createKontakt(kontaktData) {

    // console.log(kontaktData[0]);

    scrollContainer = document.getElementById('scroll-kontakt');
    TweenMax.set(scrollContainer, {y: 20});
    var bounds = {minX: 0, minY: -10, maxX: 0, maxY: 10};
    // var bounds = {minX: 0, minY: -1300, maxX: 0, maxY: 10};
    // minX: 0, minY: -imprintText.getBoundingClientRect().height, maxX: 0, maxY: 10
    draggable = Draggable.create(scrollContainer, {type: "y", bounds: bounds, edgeResistance: .75, throwProps: true});
    scrollContainer.addEventListener('touchmove', function (e) {
        e.preventDefault();
    }, false);

    document.getElementById('kontakt-adress').innerHTML = kontaktData[0]['adress'].replace(/\n/g, "<br/>");

    document.getElementById('kontakt-mail').setAttribute("href", 'mailto:' + kontaktData[0]['mail']);
    document.getElementById('kontakt-mail').innerHTML = kontaktData[0]['mail'];

    document.getElementById('kontakt-phone').setAttribute("href", 'tel:' + kontaktData[0]['phone']);
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
    // console.log(aboutData[0]);

    var containerAbout = document.getElementById('scroll-about');
    TweenMax.set(containerAbout, {y: 20});
    Draggable.create(containerAbout, {type: "y", bounds: '#bounds-about', edgeResistance: .75, throwProps: true});
    containerAbout.addEventListener('touchmove', function (e) {
        e.preventDefault();
    }, false);


    var aboutText = aboutData[0]['text'].replace(/\n/g, "<br/>")
    aboutText = aboutText.replace('-image-', '<img id="about-image" class="about-image" src="">')
    document.getElementById('about-text').innerHTML = aboutText;
    var imagePath = aboutData[0]['path'] + "/" + aboutData[0]['image'];
    document.getElementById('about-image').setAttribute("src", imagePath);

}

/*--------------------------------------------
 ~ impressum
 --------------------------------------------*/
var kontakt = document.getElementById('content-kontakt');
var kontaktHeight = kontakt.getBoundingClientRect().height;
var pinPoint = {y: 450, offset: 75, isSet: false};

var imprint = document.getElementById('imprint');
var imprintButton = document.getElementById('imprint-button');
var imprintText = document.getElementById('imprint-text');

imprintButton.addEventListener('mouseover', function (event) {
    if (!pinPoint.isSet) {
        TweenMax.to(imprintButton, .4, {opacity: 1, ease: Sine.easeOut});
    }
});

imprintButton.addEventListener('mouseout', function (event) {
    if (!pinPoint.isSet) {
        TweenMax.to(imprintButton, .4, {opacity: .5, ease: Sine.easeOut});
    }
});

function closeImprint() {
    pinPoint.isSet = false;
    TweenMax.to(imprintText, .5, {opacity: 0, ease: Power1.easeIn});
    TweenMax.to(scrollContainer, .5, {y: 10});
    TweenMax.to(imprint, .5, {
        top: kontaktHeight - pinPoint.offset, ease: Power2.easeOut, onComplete: function () {
            checkContentOverflow();
            draggable[0].applyBounds({minX: 0, minY: -10, maxX: 0, maxY: 10});
        }
    });
    TweenMax.to(imprintButton, .4, {opacity: .5, ease: Sine.easeOut});
}

imprintButton.addEventListener('click', function (event) {
    if (!pinPoint.isSet) {
        pinPoint.isSet = true;
        TweenMax.set(scrollContainer, {height: 1800});
        TweenMax.to(imprintText, .4, {opacity: 1, ease: Sine.easeOut});
        TweenMax.to(scrollContainer, .4, {y: -335, ease: Power2.easeOut});
        TweenMax.to(imprint, .4, {
            top: pinPoint.y - pinPoint.offset, ease: Power2.easeOut, onComplete: function () {
                // var offset = isLandscape ? 200 : 0;
                draggable[0].applyBounds({minX: 0, minY: -(imprintText.getBoundingClientRect().height + 200), maxX: 0, maxY: 10});
            }
        })
    } else {
        closeImprint();
    }

});


/*--------------------------------------------
 ~
 --------------------------------------------*/

var options = document.getElementById('options');
var scrollAbout = document.getElementById('scroll-about');

var contentAbout = document.getElementById('content-about');
var contentKontakt = document.getElementById('content-kontakt');

window.addEventListener("resize", onResize);
window.addEventListener("orientationchange", onOrientationChange);


function onOrientationChange(e) {

    if (isMobileSelect) {
        hideMobileSelect();
    }

    if (mobile) {
        kontaktClose();
        aboutClose();
    }

    if (screen.orientation.type == 'landscape-primary') {
        if (mobileNav) {
            setOptions();
        }
    }
}

function onResize(e) {

    if (isInitial) {
        setLogo()
    }

    checkMobile();
    checkContentOverflow();

    if (!mobileNav) {
        setOptions();
    }

    if (mobileNav && isMobileSelect) {
        hideMobileSelect();
    }


    setLightboxHeight();
    setContentHeight();

}

function setOptions() {
    TweenMax.set(options, {right: (window.innerWidth - 600) * .47})
}

function setLightboxHeight() {
    TweenMax.set(lightbox, {height: window.innerHeight - 60});
}

function setContentHeight() {
    TweenMax.set([contentAbout, contentKontakt], {height: window.innerHeight - menueBarSize.defaultHeight});
}

function setLogo() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    var logo = document.getElementById('logo');
    var logoWidth = document.getElementById('logo').getBoundingClientRect().width;
    var logoHeight = document.getElementById('logo').getBoundingClientRect().height;

    TweenMax.set(logo, {
        left: w * .5 - logoWidth * .5,
        top: h * .5 - logoHeight * .5
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

    var diffAbout = window.innerHeight - menueBarSize.defaultHeight - scrollAbout.getBoundingClientRect().height;
    var diffKontakt = window.innerHeight - menueBarSize.defaultHeight - scrollContainer.getBoundingClientRect().height;

    diffAbout <= 0 ?
        TweenMax.set('#bounds-about', {height: window.innerHeight - menueBarSize.defaultHeight}) :
        TweenMax.set('#bounds-about', {height: scrollAbout.getBoundingClientRect().height});

    if (!pinPoint.isSet) {
        if (diffKontakt <= 0) draggable[0].applyBounds({minX: 0, minY: -(window.innerHeight - menueBarSize.defaultHeight), maxX: 0, maxY: 10})
    }

    kontakt = document.getElementById('content-kontakt');
    kontaktHeight = kontakt.getBoundingClientRect().height;

    if (!pinPoint.isSet) {
        if (kontaktHeight > pinPoint.y) TweenMax.set(imprint, {top: kontaktHeight - pinPoint.offset})
    }
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

    TweenMax.delayedCall(2, checkLoad)
}

function setBar(state) {
    if (window.innerWidth > window.innerHeight && window.innerHeight < 450) {
        TweenMax.set('#logo', {transformOrigin: '-10% 10%', scale: .75})
    }

    if (state == 0) {
        TweenMax.set('#bar-a', {drawSVG: '0% 0%'});
        TweenMax.set('#bar-j', {drawSVG: '0% 0%'});
    } else if (state == 1) {
        TweenMax.to('#bar-a', 1.5, {delay: 0, drawSVG: '0% 100%', ease: Power2.easeInOut});
        TweenMax.to('#bar-j', 1.5, {delay: .3, drawSVG: '0% 100%', ease: Power3.easeInOut});
    }
    else if (state == 2) {
        TweenMax.to('#bar-j', .5, {delay: .0, drawSVG: '0% 0%', ease: Power3.easeInOut});
        TweenMax.to('#bar-a', .5, {delay:.25, drawSVG: '0% 0%', ease: Power2.easeInOut});

        TweenMax.to('#bar-j', 1, {delay: 1, drawSVG: '0% 100%', ease: Power3.easeInOut});
        TweenMax.to('#bar-a', 1, {delay: .75, drawSVG: '0% 100%', ease: Power2.easeInOut});
    }

}


setBar(0);
setOptions();


function checkLoad() {

    if (imagesLoaded) {
        viewContents();
    } else {
        TweenMax.delayedCall(.2, checkLoad)
    }
}

function viewContents() {

    TweenMax.to(menueBar, .5, {
        top: 0, ease: Sine.easeOut, onComplete: function () {
            setBar(1);
        }
    });

    TweenMax.to('#layer-start', .5, {delay: 0, autoAlpha: 0, ease: Sine.easeIn});
    TweenMax.to('#path_a', .3, {delay: 0, drawSVG: '0% 0%', ease: Cubic.easeOut});
    TweenMax.to('#path_j', .3, {delay: 0, drawSVG: '0% 0%', ease: Cubic.easeOut});

    TweenMax.set(['html', 'body'], {overflow: 'visible'});
    TweenMax.to(itemContainer, .5, {display: 'block', opacity: 1, ease: Sine.easeOut});
    setLightboxHeight();
    isInitial = false;
}

var mobile = isMobile.any;

getItemData(onRecieve);

buildLogo();


