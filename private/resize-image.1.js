// Create an image element
const img = document.createElement('img');
const img001 = document.querySelector('#img001');

const reader = new FileReader();

reader.addEventListener('load', () => {
  const dataUri = reader.result;
  img001.src = dataUri;

  dataUri;
  // Do something with data URI...
});

reader.readAsDataURL(field);

const myForm = document.querySelector('#my-form');
if (myForm && myForm.addEventListener) {
  myForm.addEventListener(
    'submit',
    e => {
      e.preventDefault(); // Prevent submission
    },
    false
  ); //Modern browsers
}

img.addEventListener('load', () => {
  // Initialize the canvas and it's size
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // Set width and height
  canvas.width = 200;
  canvas.height = 150;

  // Draw image and export to a data-uri
  ctx.drawImage(imgEl, 0, 0, canvas.width, canvas.height);
  const dataURI = canvas.toDataURL();

  // Do something with the result, like overwrite original
  img.src = dataURI;
});
/*
+ How to Resize an Image in 10 Lines of Javascript
* Gregory Schier Headshot Gregory Schier • Jan 29, 2021 • 4 min read

Allowing users to upload photos directly to a website, without first resizing them, hurts the user experience for two reasons.

    1) Large photos take a long time to upload ⏱
    2) Large photos cost the user money in bandwidth 💸

Photos should be resized on the client before uploading, especially now that smartphones are available that can capture 100MP photos. Luckily there's an easy way to do it using the <canvas> element and a few lines of JavaScript.

# Resize Images Using <canvas>
The <canvas> element is typically used for games and other visual apps to draw things that cannot be represented by standard HTML elements. For our purposes, we'll use an invisible canvas element as an image manipulation tool.

This tutorial focuses on resizing, specifically, but similar techniques can be used to crop or apply filters to images.

We can do the following steps to resize an image.

    1) Create a canvas of the same aspect ratio, but smaller (400x300px)
    2) Draw the image to the canvas, taking up the full width and height
    3) Export the contents of the canvas to an image
    4) Use the exported image as needed

All of this takes less than 10 lines of code!

 */

// Or, reference existing image on page
// const img = document.querySelector('#my-image');

// Set the image source
// (can also be a data-uri, extracted from form input)
img.src = 'imgs/unsplash-anthony_delanoix.jpg';
img.alt = 'Paris view of the city with Eifel tower ― Anthony Delanoix (unsplash)';

/*
Using images from a different domain will require a crossorigin="anonymous" attribute on the <img> tag and a CORS-enabled server.

Here's what it looks like resizing a 180x180px image to 50x50px.


# Using Images From Forms (bonus)
There are a few extra steps needed to extract a usable image from an HTML form element. To demonstrate, we'll use this basic form with a single file input.
 */
// #% Intercept Form Submission#
// We can bind to the submit event of the form, to intercept it and prevent it from being submitted.

// myForm.addEventListener('submit', e => {
//   e.preventDefault(); // Prevent submission
//   alert('Form submition');
// });
// alert('page loading');
console.log('page loading');

// #% Extract Image as a Data URI#
// To get the image data from the form input, we can use the FileReader class.

// #% Create <img> From Data URI#
// Now that we have a data URI for the selected image, we can create an image element from it. This looks similar to what we did with FileReader.

const imgEl = document.createElement('img');
imgEl.addEventListener('load', () => {
  // Do something with <img> ...
});
// img001.src = dataUri;

/*
# Wrap-Up
Now that we have a newly-resized image, we can upload it to our server backend knowing that it will require much less bandwidth than the original photo.

I've created a (CodePen)[https://codepen.io/gschier/pen/eYBmNzE] (and embedded at the start of this post) to demonstrate what we covered today. It's an interactive demo, so feel free to play around with it.

Happy coding 👋

const form = document.querySelector('#my-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get data URI of the selected image
  const formData = new FormData(e.currentTarget);
  const photoField = formData.get('photo');
  const dataUri = await dataUriFromFormField(photoField);

  const imgEl = document.createElement('img');
  imgEl.addEventListener('load', () => {
    const resizedDataUri = resizeImage(imgEl, 300);
    document.querySelector('#img-preview').src = resizedDataUri;
  });
  imgEl.src = dataUri;
});

function dataUriFromFormField (field) {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      resolve(reader.result);
    });

    reader.readAsDataURL(field);
  });
}

function resizeImage (imgEl, wantedWidth) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const aspect = imgEl.width / imgEl.height;

  canvas.width = wantedWidth;
  canvas.height = wantedWidth / aspect;

  ctx.drawImage(imgEl, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL();
}
 */
