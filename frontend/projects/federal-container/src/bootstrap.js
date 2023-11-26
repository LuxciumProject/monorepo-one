import mountCart from 'cart/CartShow';
import mountProducts from 'products/ProductsIndex';

void (async function MAIN_IIFE() {
  if (process.env['NODE_ENV'] === 'development') {
    console.log('From Container !!!');
    console.log('From Container !!! before mountProducts');
    mountProducts(document.querySelector('#dev-products'));
    console.log('From Container !!! before mountCart');
    mountCart(document.querySelector('#dev-cart'));

    return void null;
  }

  // HACK: may need to rename #IDs
  mountProducts(document.querySelector('#dev-products'));
  mountCart(document.querySelector('#dev-cart'));
  return void null;
})();
