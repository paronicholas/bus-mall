'use strict';

// Global Variables
var numOfImagesOnPage = 6;

var totalCLicks = 0;
var tempArray = [];
var itemArray = [];
var resultUlTag = document.getElementById('clickResults');
var imageSectionTag = document.getElementById('centerBox');

// Constructor
function ItemPicture(name, imageSrc){
  this.name = name;
  this.clicks = 0;
  this.timesShown = 0;
  this.url = imageSrc;

  ItemPicture.allImages.push(this);
}
ItemPicture.allImages = [];

// Random Number Generator
function randomNumGen(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function indexGenerator(){
  var indexGen = randomNumGen(0, ItemPicture.allImages.length - 1);
  return indexGen;
}

// DOM
function setDivTag(){
  var divTag = document.createElement('div');
  return divTag;
}

function setImageTag(){
  var imageTag = document.createElement('img');
  return imageTag;
}

function setImageH3(){
  var imageH3 = document.createElement('h3');
  return imageH3;
}

// Rendering Functions
function renderNewImage(imageIndex){
  var divTag = setDivTag();
  var imageTag = setImageTag();
  var imageH3 = setImageH3();
  imageTag.src = ItemPicture.allImages[imageIndex].url;
  imageTag.setAttribute('id', imageIndex);
  divTag.appendChild(imageTag);
  imageH3.textContent = ItemPicture.allImages[imageIndex].name;
  divTag.appendChild(imageH3);
  imageSectionTag.appendChild(divTag);
}

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

// Handle Functions
function pickImage(numImages){
  for(let i=0; i<numImages; i++){
    do {
      var imageIndex = indexGenerator();
    } while(tempArray.includes(imageIndex) || itemArray.includes(imageIndex));
    itemArray.push(imageIndex);
    ItemPicture.allImages[imageIndex].timesShown++;
    renderNewImage(imageIndex);
  }
  tempArray = itemArray;
  itemArray = [];

}

function handleClickOnImage(e){
  var idNum = e.target.id;
  ItemPicture.allImages[idNum].clicks++;
  imageSectionTag.innerHTML = '';
  pickImage(numOfImagesOnPage);
  totalCLicks++;
  if(totalCLicks === 25){
    imageSectionTag.removeEventListener('click', handleClickOnImage);
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
  pickImage(numOfImagesOnPage);
}

startApp();
