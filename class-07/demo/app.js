'use strict';

var tableEl = document.getElementById('table');
var allPets = [];
var titles = ['Name', 'Type', 'Color', 'Age'];

function Pet(name, type, color, age){
  this.name = name;
  this.type = type;
  this.color = color;
  this.age = age;

  allPets.push(this);
}

Pet.prototype.renderPet = function(){
  
  // for every pet (for loop)
    // create a tr
    // append to the tbody
    // create a td
    // add content
    // append to the tr
    var trEl = document.createElement('tr');
    tableEl.appendChild(trEl);

    // add the name
    var tdEl = document.createElement('td');
    tdEl.textContent = allPets[i].name;
    trEl.appendChild(tdEl);

    // add the type
    var tdEl = document.createElement('td');
    tdEl.textContent = allPets[i].type;
    trEl.appendChild(tdEl);

    // add the color
    var tdEl = document.createElement('td');
    tdEl.textContent = allPets[i].color;
    trEl.appendChild(tdEl);

    // add the age
    var tdEl = document.createElement('td');
    tdEl.textContent = allPets[i].age;
    trEl.appendChild(tdEl);

}

new Pet('Fluffy', 'Cat', 'White', 1);
new Pet('Tom', 'Cat', 'Orange', 2);
new Pet('Spot', 'Dog', 'Spotted', 6);

function renderHeader(){
  // create element
  // add content
  // attach it to the DOM

  var trEl = document.createElement('tr');
  tableEl.appendChild(trEl);

  for(var i = 0; i < titles.length; i++){
    var thEl = document.createElement('th');
    thEl.textContent = titles[i];
    trEl.appendChild(thEl);
  }
}

renderHeader();

for(var i = 0; i<allPets.length; i++){
  allPets[i].renderPet();
}
