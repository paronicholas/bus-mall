'use strict';
/*global randomInclusiveNumGen createDivTag createImageTag createH3Tag ItemPicture Chart buildItemPicture*/

// Global Variables
var numOfImagesOnPage = 3;
var totalClicks = 0;
var maxClicks = 25;

// temp storage for images on page
var previousItemArray = [];
var currentItemArray = [];

// random color array for rgba colors
var randomColorArray = [];

// Global DOM elements - import from dom_manipulation.js
var imageSectionTag = getSectionIdTag('centerBox'); // eslint-disable-line

// Local Storage
var getTotalClicks = JSON.parse(localStorage.getItem('clickStorage'));
totalClicks = getTotalClicks < maxClicks ? getTotalClicks : 0;

var getItemPicture = JSON.parse(localStorage.getItem('ItemPicture'));

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
    randomColorArray.push(ItemPicture.allImages[i].graphColor);
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
  var name = resultsArray[0];
  var percentage = resultsArray[1];
  var barColor = resultsArray[2];
  var clicked = resultsArray[3];
  var shown = resultsArray[4];

  var ctx = document.getElementById('resultsChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: name,
      datasets: [{
        data: percentage,
        backgroundColor: barColor,
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
        custom: function(tooltip){
          if (!tooltip) return;
          tooltip.displayColors = false;
        },
        callbacks: {
          beforeLabel: function(tooltipItem){
            let displayed = `Percent Clicked: ${percentage[tooltipItem.index]}%`;
            return displayed;
          },
          label: function(tooltipItem){
            let displayed = `Times Clicked: ${clicked[tooltipItem.index]}`;
            return displayed;
          },
          afterLabel: function(tooltipItem){
            let displayed = `Times Shown: ${shown[tooltipItem.index]}`;
            return displayed;
          }
        },
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
    if(totalClicks >= maxClicks){
      imageSectionTag.removeEventListener('click', handleClickOnImage);
      renderResultsChart();
    } else {
      ItemPicture.allImages[idNum].timesClicked++;
      imageSectionTag.innerHTML = '';
      handlePickImage(numOfImagesOnPage);
      totalClicks++;
      localStorage.setItem('clickStorage', JSON.stringify(totalClicks));
      localStorage.setItem('ItemPicture', JSON.stringify(ItemPicture.allImages));
      renderResultsChart();
    }
  }
}

// APP INITIALIZER
function initPage(){
  buildItemPicture();
  ItemPicture.allImages = getTotalClicks < maxClicks ? getItemPicture : ItemPicture.allImages;
  imageSectionTag.addEventListener('click', handleClickOnImage);
  handlePickImage(numOfImagesOnPage);
  renderResultsChart();
}

initPage();
