// Variables

const imgContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

const count = 15;
const apiKey = 'WWI8NFTrV5svChxfcjNOlrVj0Mon1cHXWG5psNKk4Ys';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let imagesArray = [];

// Loading Images
function loadImages() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

// DIsplaying Images
function displayImages() {
    imagesLoaded = 0;
    totalImages = imagesArray.length;

    imagesArray.forEach((photo) => {
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');

        
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);

        img.addEventListener('load', loadImages);

        item.appendChild(img);
        imgContainer.appendChild(item);

    });
}

// Getting Images
async function getImages() {
    try {
        const response = await fetch(apiUrl);
        imagesArray = await response.json();
        displayImages();

    } catch (error) {

    }
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getImages();
    }
});

getImages();