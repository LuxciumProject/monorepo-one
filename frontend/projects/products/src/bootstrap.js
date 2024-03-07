import { faker } from '@faker-js/faker';

export const mount = (/** @type {Element} */ element) => {
  let products = '';
  for (let i = 0; i < 10; i++) {
    const name = faker.commerce.productName();
    products += `<div>${name}</div>`;
  }

  element ? (element.innerHTML = products) : void null;
  return element;
};

/**
 * Will be used in development only in isolation mode to render
 * into the #isolation-dev-products element
 */
function automount(/** @type {'#isolation-dev-products'} */ selector) {
  const devProductsElement = document.querySelector(selector);
  if (devProductsElement) {
    console.log('From Products Page (before mount)!!!');
    mount(devProductsElement);
    return console.log('From Products Page (after mount)!!!');
  }
  return console.error(`Will not automount: Did not find element ${selector}`);
}

// Context/Situation #1
// We are running this file in development in isolation
// We are using our local index.html file
// Which DEFNITELY has an element with an id of 'isolation-dev-products'
// We want to immediately render our app into that element

if (process.env['NODE_ENV'] === 'development') {
  // Assuming our container doesnt have an element
  // with id 'isolation-dev-products'....
  console.log('From Products Page !!!');
  automount('#isolation-dev-products');
  // We are probably running in isolation
}

// Context/Situation #2
// We are running this file in develpment or production
// through the CONTAINER app
// NO GUARANTEE that an element with an id of 'isolation-dev-products' exists
// WE DO NOT WANT try to immediately render the app
export default mount;
