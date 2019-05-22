'use strict';

var tableEl = document.getElementById('table');
var headers = ['Name', 'Type', 'Color', 'Age'];
var allPets = [];

function Pet(name, type, color, age){
  this.name = name;
  this.type = type;
  this.color = color;
  this.age = age;
  
  allPets.push(this);
}

new Pet('fluffy', 'cat', 'white', 1);
new Pet('tom', 'cat', 'orange', 2);
new Pet('spot', 'dog', 'brown', 6);

function makeHeader(){
  var trEl = document.createElement('tr');
  tableEl.appendChild(trEl);
  
  for(var i = 0; i < headers.length; i++){
    var thEl = document.createElement('th');
    thEl.textContent = headers[i];
    trEl.appendChild(thEl);
  }
}

Pet.prototype.renderPet = function(){
  var trEl = document.createElement('tr');
  tableEl.appendChild(trEl);

  var tdEl = document.createElement('td');
  tdEl.textContent = this.name;
  trEl.appendChild(tdEl);

  var tdEl = document.createElement('td');
  tdEl.textContent = this.type;
  trEl.appendChild(tdEl);

  var tdEl = document.createElement('td');
  tdEl.textContent = this.color;
  trEl.appendChild(tdEl);

  var tdEl = document.createElement('td');
  tdEl.textContent = this.age;
  trEl.appendChild(tdEl);
}

function renderAll(){
  makeHeader();
  for(var i = 0; i < allPets.length; i++){
    allPets[i].renderPet();
  }
}

renderAll();

// make new instances of pets for fluffy, tom, and spot

// header

  // need a tr to be the parent element
  // loop
    // create a th
    // give it content
    // append it to the parent

// body

  // need a tr for each row
  // loop
    // create a td
    // give it content
    // append it to the parent