const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

const count = 30;
const apiKey = '1WXMt2KHuObs3_CbO20XyW8S4U9uZXxxcIEyYqz4wpI';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

let photoArray = [];

function setAttributes(element, attributes) {
    for (const key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
  }

function displayPhoto(){
    photoArray.forEach((photo) => {
        const item = document.createElement('a');

        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

async function getPhoto(){
    try {
        const response = await fetch(apiUrl);
        photoArray = await response.json();
        // console.log(photoArray[0].id);
        displayPhoto();

    } catch (error) {
        console.log('I am suck !')
    }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
      getPhoto();
    }
  });

getPhoto();