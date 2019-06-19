'use strict';

// Global Variables
var numOfImagesOnPage = 3;
var totalCLicks = 0;
var maxClicks = 25;

// temp storage for images on page
var previousItemArray = [];
var currentItemArray = [];

// random color array for rgba colors
var randomColorArray = [];

// Global DOM elements - import from dom_manipulation.js
var imageSectionTag = getSectionIdTag('centerBox');

// Constructor
function ItemPicture(name, imageSrc, timesClicked, timesShown){
  this.name = name;
  this.url = imageSrc ? imageSrc : 'https://placehold.it/220x300/111';
  this.timesClicked = timesClicked ? timesClicked : 0;
  this.timesShown = timesShown ? timesShown : 0;

  ItemPicture.allImages.push(this);
}
ItemPicture.allImages = [];

function buildItemPicture(){
  new ItemPicture('Bag', './img/bag.jpg');
  new ItemPicture('Banana', './img/banana.jpg');
  new ItemPicture('Bathroom', './img/bathroom.jpg');
  new ItemPicture('Boots', './img/boots.jpg');
  new ItemPicture('Breakfast', './img/breakfast.jpg');
  new ItemPicture('Bubblegum', './img/bubblegum.jpg');
  new ItemPicture('Chair', './img/chair.jpg');
  new ItemPicture('Cthulhu', './img/cthulhu.jpg');
  new ItemPicture('Dog-Duck', './img/dog-duck.jpg');
  new ItemPicture('Dragon', './img/dragon.jpg');
  new ItemPicture('Pen', './img/pen.jpg');
  new ItemPicture('Pet Sweep', './img/pet-sweep.jpg');
  new ItemPicture('Scissors', './img/scissors.jpg');
  new ItemPicture('Shark', './img/shark.jpg');
  new ItemPicture('Sweep', './img/sweep.png');
  new ItemPicture('Tauntaun', './img/tauntaun.jpg');
  new ItemPicture('Unicorn', './img/unicorn.jpg');
  new ItemPicture('USB', './img/usb.gif');
  new ItemPicture('Water Can', './img/water-can.jpg');
  new ItemPicture('Wine Glass', './img/wine-glass.jpg');
}

// Generator functions
function generateIndex(){
  var indexGen = randomInclusiveNumGen(0, ItemPicture.allImages.length - 1);
  return indexGen;
}

function generateResults(){
  var allResultsArray = [], percentageArray = [], nameArray = [], clicksArray = [], shownArray = [], clickPercent;
  for(let i=0; i<ItemPicture.allImages.length; i++){
    if(ItemPicture.allImages[i].timesClicked === 0 && ItemPicture.allImages[i].timesShown === 0) {
      clickPercent =0;
    } else{
      clickPercent = (ItemPicture.allImages[i].timesClicked / ItemPicture.allImages[i].timesShown) * 100;
    }
    clickPercent = clickPercent.toFixed(2); // sets two decimal points
    nameArray.push(ItemPicture.allImages[i].name);
    percentageArray.push(clickPercent);
    randomColorArray.push(random_rgba());
    clicksArray.push(ItemPicture.allImages[i].timesClicked);
    shownArray.push(ItemPicture.allImages[i].timesShown);
  }
  allResultsArray.push(nameArray, percentageArray, randomColorArray, clicksArray, shownArray);
  return allResultsArray;
}

// Rendering Functions
function renderImage(imageIndex){
  var divTag = createDivTag();
  var imageTag = createImageTag();
  var imageH3 = createH3Tag();

  imageTag.src = ItemPicture.allImages[imageIndex].url;
  imageTag.setAttribute('id', imageIndex);
  divTag.appendChild(imageTag);
  imageH3.textContent = ItemPicture.allImages[imageIndex].name;
  divTag.appendChild(imageH3);
  imageSectionTag.appendChild(divTag);
}

function renderResultsChart(){
  var resultsArray = generateResults();
  var percentage = resultsArray[1];
  var clicked = resultsArray[3];
  var shown = resultsArray[4];
  var ctx = document.getElementById('resultsChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: resultsArray[0],
      datasets: [{
        data: resultsArray[1],
        backgroundColor: resultsArray[2],
        borderWidth: 1
      }]
    },
    options: {
      title: {
        display: true,
        position: 'top',
        text: 'User Selection Votes'
      },
      legend: {
        display: false,
        position: 'bottom'
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      },
      tooltips: {
        mode: 'label',
        callbacks: {
          label: function(tooltipItem){
            let displayed = `Percent Clicked: ${percentage[tooltipItem.index]}%`;
            return displayed;
          },
          afterLabel: function(tooltipItem){
            let displayed = `Times Clicked: ${clicked[tooltipItem.index]} and Times Shown: ${shown[tooltipItem.index]}`;
            return displayed;
          }
        }
      }
    }
  });
}

// Handle Functions
function handlePickImage(numImages){
  var imageIndex;
  for(let i=0; i<numImages; i++){
    do {
      imageIndex = generateIndex();
    } while(previousItemArray.includes(imageIndex) || currentItemArray.includes(imageIndex));
    currentItemArray.push(imageIndex);
    ItemPicture.allImages[imageIndex].timesShown++;
    renderImage(imageIndex);
  }
  previousItemArray = currentItemArray;
  currentItemArray = [];
}

function handleClickOnImage(e){
  var idNum = e.target.id;
  // handles if no image is clicked, only increments if image is clicked
  if(ItemPicture.allImages[idNum]){
    ItemPicture.allImages[idNum].timesClicked++;
    imageSectionTag.innerHTML = '';
    handlePickImage(numOfImagesOnPage);
    totalCLicks++;
    renderResultsChart();
    if(totalCLicks === maxClicks){
      imageSectionTag.removeEventListener('click', handleClickOnImage);
      renderResultsChart();
    }
  }
}

// APP INITIALIZER
function initPage(){
  buildItemPicture();
  imageSectionTag.addEventListener('click', handleClickOnImage);
  handlePickImage(numOfImagesOnPage);
  renderResultsChart();
}

initPage();
