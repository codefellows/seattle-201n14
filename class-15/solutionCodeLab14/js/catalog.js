/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
var cart = new Cart([]);

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {

  //TODO: Add an <option> tag inside the form's select for each product
  var selectElement = document.getElementById('items');
  for (var i in Product.allProducts) {
    var option = document.createElement('option');
    option.value = Product.allProducts[i].name;
    option.textContent = Product.allProducts[i].name; 
    selectElement.appendChild(option);
  }

}

function handleSubmit(event) {

  event.preventDefault();

  // Do all the things ...
  addSelectedItemToCart();
  cart.saveToLocalStorage();
  cart.updateCounter();
  updateCartPreview();

}

function addSelectedItemToCart() {
  var item = document.getElementById('items').value;
  var quantity = document.getElementById('quantity').value;
  cart.addItem(item, quantity);
}

function updateCartPreview() {

  var item = document.getElementById('items').value;
  var quantity = document.getElementById('quantity').value;
  var cartOutput = document.getElementById('cartContents');
  var itemElement = document.createElement('div');
  itemElement.textContent = `${quantity} : ${item}`;
  cartOutput.appendChild(itemElement);
  console.log('item', item, 'quantity', quantity, cartOutput)
}

var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

populateForm();