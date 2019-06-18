'use strict';

// globals
// DOM set-up
var resultUlTag = document.getElementById('clickResults');
var imageSectionTag = document.getElementById('centerBox');
var leftImageTag = document.getElementById('leftImageImg');
var centerImageTag = document.getElementById('centerImageImg');
var rightImageTag = document.getElementById('rightImageImg');
var leftImageH3 = document.getElementById('leftImageH3');
var centerImageH3 = document.getElementById('centerImageH3');
var rightImageH3 = document.getElementById('rightImageH3');

// temp variables for storing index of previously displayed items
var tempLeft;
var tempCenter;
var tempRight;
var tempArray = [];

// variables to store picture on the page
var leftPicOnPage = null;
var centerPicOnPage = null;
var rightPicOnPage = null;

var totalClicks = 0;

// Constructor
function ItemPicture(name, imageSrc){
  this.name = name;
  this.imgId = name.toLowerCase();
  this.clicks = 0;
  this.timesShown = 0;
  this.url = imageSrc;

  ItemPicture.allImages.push(this);
}

ItemPicture.allImages = [];

function renderResultsList(){
  var clickPercent = 0;
  for(let i = 0; i < ItemPicture.allImages.length; i++){
    var liEl = document.createElement('li');
    if(ItemPicture.allImages[i].clicks === 0 && ItemPicture.allImages[i].timesShown === 0){
      clickPercent = 0;
    } else{
      clickPercent = (ItemPicture.allImages[i].clicks / ItemPicture.allImages[i].timesShown) * 100;
    }
    clickPercent = clickPercent.toFixed(2);
    liEl.textContent = ItemPicture.allImages[i].name + ': ' + clickPercent + '%';
    resultUlTag.appendChild(liEl);
  }
}

function renderNewImage(leftIndex, centerIndex, rightIndex){
  leftImageTag.src = ItemPicture.allImages[leftIndex].url;
  leftImageH3.textContent = ItemPicture.allImages[leftIndex].name;
  centerImageTag.src = ItemPicture.allImages[centerIndex].url;
  centerImageH3.textContent = ItemPicture.allImages[centerIndex].name;
  rightImageTag.src = ItemPicture.allImages[rightIndex].url;
  rightImageH3.textContent = ItemPicture.allImages[rightIndex].name;

}

// Random number generator and index assigners
function randomNumGen(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function leftIndexGen(){
  var leftIndex = randomNumGen(0, ItemPicture.allImages.length - 1);
  return leftIndex;
}

function centerIndexGen(){
  var centerIndex = randomNumGen(0, ItemPicture.allImages.length - 1);
  return centerIndex;
}

function rightIndexGen(){
  var rightIndex = randomNumGen(0, ItemPicture.allImages.length - 1);
  return rightIndex;
}

function pickImage(){
  do {
    var leftIndex = leftIndexGen();
  } while(tempArray.includes(leftIndex));
  do {
    var centerIndex = centerIndexGen();
  } while(centerIndex === leftIndex || tempArray.includes(centerIndex));
  do {
    var rightIndex = rightIndexGen();
  } while(rightIndex === leftIndex || rightIndex === centerIndex || tempArray.includes(rightIndex));
  tempLeft = leftIndex;
  tempCenter = centerIndex;
  tempRight = rightIndex;

  tempArray = [tempLeft, tempCenter, tempRight];

  leftPicOnPage = ItemPicture.allImages[leftIndex];
  centerPicOnPage = ItemPicture.allImages[centerIndex];
  rightPicOnPage = ItemPicture.allImages[rightIndex];

  renderNewImage(leftIndex, centerIndex, rightIndex);
}

function handleClickOnImage(e){
  if(e.target.id === 'leftImageImg' || e.target.id === 'centerImageImg' || e.target.id === 'rightImageImg'){
    if(e.target.id === 'leftImageImg'){
      leftPicOnPage.clicks++;
    } else if(e.target.id === 'centerImageImg'){
      centerPicOnPage.clicks++;
    } else{
      rightPicOnPage.clicks++;
    }
    leftPicOnPage.timesShown++;
    centerPicOnPage.timesShown++;
    rightPicOnPage.timesShown++;
    pickImage();
  }
  totalClicks++;
  if(totalClicks === 25){
    imageSectionTag.removeEventListener('click', handleClickOnImage);
    // imageSectionTag.innerHTML = '';
    renderResultsList();
  }
}

/*
APP INITIALIZER
*/
function startApp(){
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

  imageSectionTag.addEventListener('click', handleClickOnImage);
  pickImage();
}

startApp();
