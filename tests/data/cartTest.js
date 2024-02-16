import { addToCart, cart, loadFromStorage, removeFromCart} from "../../data/cart.js";

describe('test suite: addToCard', ()=>{

  beforeEach(() =>{
    spyOn(localStorage,'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    }); 
    loadFromStorage(); 
  
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
  });




 it('adds an existing product to the cart', () =>{

  expect(cart.length).toEqual(1); 
  expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
    productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1'
  }]));
  expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
  expect(cart[0].quantity).toEqual(2); 

 });

 it('adds a new product to the cart', () =>{
   expect(cart.length).toEqual(1); 
   expect(localStorage.setItem).toHaveBeenCalledTimes(1);
   expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
    productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1'
  }]));
   expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
   expect(cart[0].quantity).toEqual(2); 
 
 });

});

describe('test suite: removeFromCart', () => {
  beforeEach(() => {
    spyOn(localStorage,'setItem');
  });


  it('removes a productId that is in the cart', ()=>{
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    }); 
    loadFromStorage(); 
  
    removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(0); 
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([]));
  });
  
  it('does nothing if product is not in the cart', ()=>{
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
        {
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 1,
          deliveryOptionId: '1'
        }
      ]);
    }); 
    loadFromStorage(); 
  
    removeFromCart('does-not-exist');
    expect(cart.length).toEqual(1); 
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    }]));
  });


});