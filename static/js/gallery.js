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

    br = document.createElement("br");

    newimage = document.createElement("img");
    newimage.src = image.currentSrc;
    newimage.setAttribute('onclick', 'hide();');

    div.append(p);
    div.append(br);
    div.append(newimage);
    document.body.append(div);

    console.log("Div width: " + div.offsetWidth);
    console.log("Div height: " + div.offsetHeight);
    console.log("Body width: " + document.body.offsetWidth);
    console.log("Body height: " + document.body.offsetHeight);

    if ((image.naturalWidth > div.offsetWidth) || (image.naturalHeight > div.offsetHeight)) {
        p = document.createElement("p");
        fullres = document.createElement("a");
        fullres.textContent = "Click to open full size image";
        fullres.setAttribute('href', image.currentSrc);
        fullres.setAttribute('alignment', 'center');
        div.append(p);
        p.append(fullres);
    }

    rect = div.getBoundingClientRect();
    offsetx = ((window.visualViewport.width - div.offsetWidth) / 2) + "px";
    offsety = ((Math.abs(rect.y) + (window.visualViewport.height - div.offsetHeight) / 2)) + "px";
    div.style.top = offsety;
    div.style.left = offsetx;

    console.log(`boundrect offset: ${boundoffsety}`);
    console.log(`calculated offsets: ${offsetx} x ${offsety}`);
}
      
function hide() {
    document.body.removeChild(document.getElementById("zoom-div"));
}

function replace(imageid) {
    new_primary = document.getElementById("gallery-picture-" + imageid);

    gallery = document.getElementById("gallery-1");

    for (child of gallery.children) {
        if (child == new_primary) {
            child.classList.replace("gallery-picture-thumbnail", "gallery-picture-primary");
            child.querySelector('img').classList.replace('gallery-image-thumbnail', 'gallery-image-primary');
            child.querySelector('img').setAttribute('onclick', "zoom(" + imageid + ");");
        } else if (child.classList.contains("gallery-picture-primary")) {
            childid = child.getAttribute('id').replace("gallery-picture-", "");
            console.log(`Got id ${childid}`);
            child.classList.replace("gallery-picture-primary", "gallery-picture-thumbnail");
            child.querySelector('img').classList.replace('gallery-image-primary', 'gallery-image-thumbnail');
            child.querySelector('img').setAttribute('onclick', `replace(${childid});`);
        }
    }
}
