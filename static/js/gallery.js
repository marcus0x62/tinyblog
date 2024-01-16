function zoom(id) {
    image = document.getElementById(id);
    console.log("Image source: " + image.currentSrc);

    div = document.createElement("div");
    div.id = "zoom-div";
    div.setAttribute('onclick', 'hide();');
    div.classList.add("gallery-zoom");

    p = document.createElement("a");
    p.textContent = "x";
    p.setAttribute('href', '#');
    p.setAttribute('onclick', 'hide();');

    document.onkeydown = function(evt) {
        evt = evt || window.event;
        if (evt.key === "Escape" || evt.key === "Esc") {
            document.body.removeChild(document.getElementById("zoom-div"));
            document.onkeydown = null;
        }
    };

    document.body.style.overflow = "hidden";
    br = document.createElement("br");

    newimage = document.createElement("img");
    newimage.src = image.currentSrc;

    div.append(p);
    div.append(br);
    div.append(newimage);
    document.body.append(div);

    if ((image.naturalWidth > div.offsetWidth) || (image.naturalHeight > div.offsetHeight)) {
        p = document.createElement("p");
        fullres = document.createElement("a");
        fullres.textContent = "Click to open full size image";
        fullres.setAttribute('href', image.currentSrc);
        fullres.setAttribute('alignment', 'center');
        p2 = document.createElement("p");
        p2.textContent = "Click anywhere else to close.";
        div.append(p);
        div.append(p2);
        p.append(fullres);
    } else {
        p = document.createElement("p");
        p.textContent = "Click anywhere to close.";
        div.append(p);
    }

    offsetx = ((window.visualViewport.width - div.offsetWidth) / 2) + "px";
    offsety = ((Math.abs(div.getBoundingClientRect().y) + (window.visualViewport.height - div.offsetHeight) / 2)) + "px";
    div.style.top = offsety;
    div.style.left = offsetx;
}

function hide() {
    document.body.removeChild(document.getElementById("zoom-div"));
    document.body.style.overflow = null;
}

function hide_key(e) {
    if (e.key == 'Escape') {
        document.body.removeChild(document.getElementById("zoom-div"));
        document.removeAttribute('keyup.esc');
    }
}

function replace(galleryid, imageid) {
    new_primary = document.getElementById("gallery-picture-" + imageid);

    gallery = document.getElementById("gallery-" + galleryid);

    for (child of gallery.children) {
        if (child == new_primary) {
            child.classList.replace("gallery-picture-thumbnail", "gallery-picture-primary");
            child.querySelector('img').classList.replace('gallery-image-thumbnail', 'gallery-image-primary');
            child.querySelector('img').setAttribute('onclick', "zoom('gallery-image-" + imageid + "');");
        } else if (child.classList.contains("gallery-picture-primary")) {
            childid = child.getAttribute('id').replace("gallery-picture-", "");
            child.classList.replace("gallery-picture-primary", "gallery-picture-thumbnail");
            child.querySelector('img').classList.replace('gallery-image-primary', 'gallery-image-thumbnail');
            child.querySelector('img').setAttribute('onclick', `replace(${galleryid}, ${childid});`);
        }
    }
}
