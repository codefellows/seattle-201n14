'use strict';

var formEl = document.getElementById('myForm');
var allPeople = [];

function Person(name, story, animal){
  this.name = name;
  this.story = story;
  this.animal = animal;

  allPeople.push(this);
}

  // Put in a listener
    // element, addEventListener, event, callback function
formEl.addEventListener('submit', function(e){
  // Store the form input in variables
  e.preventDefault();

  var free = [];

  if(document.getElementById("free-1").checked){
    free.push(e.target.freeOne.value);
  }

  if(document.getElementById("free-2").checked){
    free.push(e.target.freeTwo.value);
  }

  if(document.getElementById("free-3").checked){
    free.push(e.target.freeThree.value);
  }

  console.log('the free ones ', free);
  var username = e.target.username.value;
  var story = e.target.story.value;
  var animal = e.target.animal.value;

  new Person(username, story, animal);
})

console.log('all of my peep ', allPeople);

