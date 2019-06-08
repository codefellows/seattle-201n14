'use strict';

// render two images to the DOM
var votesRemaining = 10;

var canvasEl = document.getElementById('my-canvas');
var catContainerEl = document.getElementById('cat-container');

var resultsEl = document.getElementById('results');

var catOneEl = document.getElementById('cat-one');

var catTwoEl = document.getElementById('cat-two');

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


function handleClick(e){
  var catName = e.target.title;
  
  if(e.target.id === 'cat-container'){
    alert('click a cat!');
  }
  
  if(votesRemaining === 0){
    catContainerEl.removeEventListener('click', handleClick);
    // render the results to the DOM
    renderChart();
  }
  
  for(var i = 0; i < allCats.length; i++){
    if(catName === allCats[i].name){
      allCats[i].votes++;
      votesRemaining--;
    }
  }
  render();
}

catContainerEl.addEventListener('click', handleClick);

render();

////////////////////////////////////

function renderChart(){
  var namesArray = [];
  var votesArray = [];

  for(var i = 0; i < allCats.length; i++){
    namesArray.push(allCats[i].name);
    votesArray.push(allCats[i].votes);
  }


  var ctx = canvasEl.getContext('2d');
  
  var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: namesArray, // names of each object
          datasets: [{
              label: '# of Votes',
              data: votesArray, // number of votes for each object
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  });

}