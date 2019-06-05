'use strict';

// render two images to the DOM
var votesRemaining = 10;

var catContainerEl = document.getElementById('cat-container');

var resultsEl = document.getElementById('results');

var catOneEl = document.getElementById('cat-one');

var catTwoEl = document.getElementById('cat-two');

// catOneEl.src = 'img/cuddleCats.jpg';

// catOneEl.title = 'cuddleCats';
// catOneEl.alt = 'cuddleCats';

// catTwoEl.src = 'img/yogaCat.jpg';
// catTwoEl.title = 'yogaCat';
// catTwoEl.alt = 'yogaCat';

// now, render two random images to the DOM from an array of images

// make sure they don't repeat

// change the images when they are clicked

var allCats = [];

function Cat(name){
  this.name = name;
  this.filepath = `img/${name}.jpg`;
  this.votes = 0;
  this.views = 0;

  allCats.push(this);
}

new Cat('boxCat');
new Cat('chargingCat');
new Cat('cuddleCats');
new Cat('multiTaskingCat');
new Cat('outsideCat');
new Cat('sleepyCat');
new Cat('tomatoCat');
new Cat('yogaCat');

var recentRandomNumbers = [];

function render(){

  var randomIndex = random(0, allCats.length-1);

  while(recentRandomNumbers.includes(randomIndex)){
    randomIndex = random(0, allCats.length-1);
  }

  if(recentRandomNumbers.length > 3){
    recentRandomNumbers.shift();
  }

  recentRandomNumbers.push(randomIndex);

  allCats[randomIndex].views++;

  catOneEl.src = allCats[randomIndex].filepath;
  catOneEl.alt = allCats[randomIndex].name;
  catOneEl.title = allCats[randomIndex].name;

  var randomIndex = random(0, allCats.length-1);

  while(recentRandomNumbers.includes(randomIndex)){
    randomIndex = random(0, allCats.length-1);
  }

  if(recentRandomNumbers.length > 3){
    recentRandomNumbers.shift();
  }

  allCats[randomIndex].views++;

  catTwoEl.src = allCats[randomIndex].filepath;
  catTwoEl.alt = allCats[randomIndex].name;
  catTwoEl.title = allCats[randomIndex].name;
}

function random(min, max){
  return Math.floor(Math.random() * (max - min +1) + min);
}

function renderBestCat(){
  // create an element
  // add content
  // append to the parent

  var bestCat;
  var temp = 0;

  for(var i = 0; i < allCats.length; i++){
    if(allCats[i].votes > temp){
      temp = allCats[i].votes;
      bestCat = allCats[i];
    }
  }


  var h2El = document.createElement('h2');
  h2El.textContent = `The Best Cat is ${bestCat.name} with ${bestCat.votes} votes.`;
  resultsEl.appendChild(h2El);
}

catContainerEl.addEventListener('click', handleClick);

function handleClick(e){
  var catName = e.target.title;

  if(e.target.id === 'cat-container'){
    alert('click a cat!');
  }

  if(votesRemaining === 0){
    catContainerEl.removeEventListener('click', handleClick);
    // render the results to the DOM
    renderBestCat();
  }

  for(var i = 0; i < allCats.length; i++){
    if(catName === allCats[i].name){
      allCats[i].votes++;
      votesRemaining--;
    }
  }
  render();
}


render();

