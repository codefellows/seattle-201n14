var petListElement = document.getElementById('pet-list');

var cookie = {
  name: 'cookie',
  hair: ['brown', 'black'],
  size: 'medium',
  isLoud: false,
  render: function(){
    // create an element
    var liEl = document.createElement('li');
    
    // add content
    liEl.textContent = this.name;
    
    // append element to the parent
    petListElement.appendChild(liEl);
  }
}

// cookie.render();

var tangerine = {
  name: 'tangerine',
  hair: ['orange', 'white'],
  size: 'large',
  isLoud: true,
  render: function(){
    // create an element
    var liEl = document.createElement('li');
    
    // add content
    liEl.textContent = this.name;
    
    // append element to the parent
    petListElement.appendChild(liEl);
  }
}

// tangerine.render();

var malaki = {
  name: 'malaki',
  hair: ['orange', 'white'],
  size: 'small',
  isLoud: false,
  render: function(){
    // create an element
    var liEl = document.createElement('li');
    
    // add content
    liEl.textContent = this.name;
    
    // append element to the parent
    petListElement.appendChild(liEl);
  }
}

// malaki.render();
var allPets = [cookie, tangerine, malaki];

for( var i = 0; i < allPets.length; i++){
  console.log(allPets[i]);
  allPets[i].render();
}

