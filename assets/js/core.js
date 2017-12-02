console.log('core!')

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

    console.log(data)

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
 --------------------------------------------*/

var gallery_options = {
    history: false,
    focus: false,
    showAnimationDuration: 0,
    hideAnimationDuration: 0
};

var buildGallery = function (_images) {

    console.log('build', _images)

    pswpElement.style.display = 'block';

    var items = [];
    for (var i = 0; i < _images.length; i++) {
        var text = '<div>' + _images[i][2] + '</div><div style="font-size: 1.2rem">' + _images[i][3] + '</div>';
        var o = {
            src: _images[i][0] + "/" + _images[i][1],
            w: 1280,
            h: 960,
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
 ~ init
 --------------------------------------------*/

getData(onRecieve);


