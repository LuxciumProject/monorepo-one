import { faker } from '@faker-js/faker';

export const mount = (element: Element) => {
  const carText = `<div>${faker.random.numeric(4)} items in your cart!</div>`;

  element ? (element.innerHTML = carText) : void null;
  return element;
};

/**
 * Will be used in development only in isolation mode to render
 * into the #isolation-dev-cart element
 */
function automount(selector: '#isolation-dev-cart') {
  const devProductsElement = document.querySelector(selector);
  if (devProductsElement) {
    console.log('From Cart Page (before mount)!!!');
    mount(devProductsElement);
    return console.log('From Cart Page (after mount)!!!');
  }
  return console.error(`Will not automount: Did not find element ${selector}`);
}

// if (process.env['NODE_ENV'] === 'development') {
//   automount('#isolation-dev-cart');
// }

// Context/Situation #1
// We are running this file in development in isolation
// We are using our local index.html file
// Which DEFNITELY has an element with an id of 'isolation-dev-cart'
// We want to immediately render our app into that element
if (process.env['NODE_ENV'] === 'development') {
  // Assuming our container doesnt have an element
  // with id '#isolation-dev-cart'....
  console.log('From Cart Page !!!');
  automount('#isolation-dev-cart');
  // We are probably running in isolation
}

// Context/Situation #2
// We are running this file in develpment or production
// through the CONTAINER app
// NO GUARANTEE that an element with an id of 'isolation-dev-cart' exists
// WE DO NOT WANT try to immediately render the app
export default mount;
