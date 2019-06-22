/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
var table = document.getElementById('cart');

table.addEventListener('click', removeItemFromCart);

var cart;

function loadCart() {
  var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}


function clearCart() {
  var tableRows = document.querySelectorAll('#cart tbody tr');

  for(var i=0; i < tableRows.length; i++){
    if(tableRows[i]){
      tableRows[i].remove();
    }
  }
}

function showCart() {

  var tableBody = document.querySelector('#cart tbody');

  for(var i in cart.items) {
    var tr = document.createElement('tr');
    var xTD = document.createElement('td');
    xTD.textContent = 'x';
    xTD.classList.add('remover');
    xTD.id = i;

    var qTD = document.createElement('td');
    qTD.textContent = cart.items[i].quantity;

    var iTD = document.createElement('td');
    iTD.textContent = cart.items[i].product;

    tableBody.appendChild(tr);
    tr.appendChild(xTD);
    tr.appendChild(qTD);
    tr.appendChild(iTD);

  }

}

function removeItemFromCart(event) {
  if(event.target.classList.contains('remover')){
    cart.removeItem(parseInt(event.target.id));
    cart.saveToLocalStorage();
    renderCart();
    console.log(event.target);
  }

}

// This will initialize the page and draw the cart on screen
renderCart();