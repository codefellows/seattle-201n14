'use strict';

var petList = document.getElementById('pet-list');

var cookie = {
  name: 'cookie', 
  color: 'brown',
  isLoud: false,
  sheds: true,
  render: function(){
    var liEl = document.createElement('li');
    liEl.textContent = this.name;
    petList.appendChild(liEl);
  }
}

var malaki = {
  name: 'malaki',
  color: ['orange', 'white'],
  isLoud: true,
  sheds: false,
  render: function(){
    var liEl = document.createElement('li');
    liEl.textContent = this.name;
    petList.appendChild(liEl);
  }
}

var tangerine = {
  name: 'tangerine',
  color: ['orange', 'white'],
  isLoud: false,
  sheds: true
}

var myPets = [cookie, malaki, tangerine];

for(var i = 0; i < myPets.length; i++){
  var liEl = document.createElement('li');
  liEl.textContent = myPets[i].name;
  petList.appendChild(liEl);
}

// create an element - li
// add text (the animal names) to the element (li)
// append the element (li) to the parent (ul)






