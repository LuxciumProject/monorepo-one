const imgListDiv = document.querySelector('#images-list');
const imagesList = [
  'imgs/Lenna-sepia.jpg',
  'imgs/Lenna.jpg',
  'imgs/unsplash-anthony_delanoix.jpg',
  'imgs/unsplash-Jakub Jacobsky.jpg',
  'imgs/unsplash-Ryan Johnston.jpg',
  'imgs/unsplash-Toby Wong.jpg',
  'imgs/unsplash-Tony Reid.jpg',
  // 'imgs/Lenna.png',
]
  .map(function newImageEl(src) {
    const imgEl = document.createElement('img');
    imgEl.src = src;
    // resizeImage(imgEl, 300);
    return imgEl;
  })
  // .map(newResizedImage)
  .map((imageEl, i) => {
    if (imageEl !== null) {
      imageEl.id = `image-list-element-${i.toFixed(0).padStart(3, '0')}`;
      imgListDiv.append(imageEl);
    }
  });

function newResizedImage(imgEl) {
  const newImgEl = document.createElement('img');
  newImgEl.src = resizeImage(imgEl, 300);

  //   newImgEl.addEventListener('load', () => {
  // //   const resizedDataUri = resizeImage(imgEl, 200);
  // //   document.querySelector('#img-preview').src = resizedDataUri;
  // // });

  return newImgEl;
}

function resizeImage(imgEl, wantedHeight) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  console.log('image original size:', imgEl.width, imgEl.height);

  const aspect = Math.floor((imgEl.height / imgEl.width) * 1000) / 1000;

  console.log('image original aspect:', aspect);

  canvas.width = Math.floor((wantedHeight / aspect) * 1000) / 1000;
  canvas.height = wantedHeight;

  const canvasAspect = Math.floor((canvas.height / canvas.width) * 1000) / 1000;
  console.log('new image aspect:', canvasAspect, aspect);

  ctx.drawImage(imgEl, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL();
}
// function dataUriFromFormField(field) {
//   return new Promise(resolve => {
//     const reader = new FileReader();

//     reader.addEventListener('load', () => {
//       resolve(reader.result);
//     });

//     reader.readAsDataURL(field);
//   });
// }

// const onClickHandler = () => {
// const imgEl = document.createElement('img');
// imgEl.addEventListener('load', () => {
//   const resizedDataUri = resizeImage(imgEl, 200);
//   document.querySelector('#img-preview').src = resizedDataUri;
// });
// // Starts the load process described above.
// imgEl.src = 'imgs/unsplash-anthony_delanoix.jpg';
// };

// form.addEventListener('submit', async e => {
//   e.preventDefault();

// Get data URI of the selected image
// const formData = new FormData(e.currentTarget);
// const photoField = formData.get('photo');
// console.log(photoField);
// const dataUri = await dataUriFromFormField(photoField);
// console.log('LOG dataUri:', dataUri);
// });

// return newResizedImage(imgEl);
// imgEl.addEventListener('load', () => {
//   imgEl.src = resizeImage(imgEl, 200);
//   // document.querySelector('#img-preview').src = resizedDataUri;
// });
// Starts the load process described above.

// const newImgEl = document.createElement('img');
// newImgEl.src = resizeImage(imgEl, 10);
// console.log(newImgEl);
// return newImgEl;

// imageEl.style = 'height:200px';
// console.log('width × height :>> ', `${imageEl.width} × ${imageEl.height}`);
