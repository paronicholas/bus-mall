'use strict';

// getter tags
function getSectionIdTag(idName){
  var sectionIdTag = document.getElementById(idName);
  return sectionIdTag;
}

function getDivIdTag(idName){
  var divIdTag = document.getElementById(idName);
  return divIdTag;
}

function getTableIdTag(idName){
  var tableIdTag = document.getElementById(idName);
  return tableIdTag;
}

function getTrIdTag(idName){
  var trIdTag = document.getElementById(idName);
  return trIdTag;
}

function getThIdTag(idName){
  var thIdTag = document.getElementById(idName);
  return thIdTag;
}

function getTdIdTag(idName){
  var tdIdTag = document.getElementById(idName);
  return tdIdTag;
}

function getFormIdTag(idName){
  var formIdTag = document.getElementById(idName);
  return formIdTag;
}

function getUlIdTag(idName){
  var ulIdTag = document.getElementById(idName);
  return ulIdTag;
}

function getOlIdTag(idName){
  var olIdTag = document.getElementById(idName);
  return olIdTag;
}

function getChartIdTag(idName, dimension){
  var chartIdTag = document.getElementById(idName).getContext(dimension);
  return chartIdTag;
}


// creator tags
function createSectionTag(){
  var sectionTag = document.createElement('section');
  return sectionTag;
}

function createDivTag(){
  var divTag = document.createElement('div');
  return divTag;
}

function createTableTag(){
  var tableTag = document.createElement('table');
  return tableTag;
}

function createTrTag(){
  var trTag = document.createElement('tr');
  return trTag;
}

function createThTag(){
  var thTag = document.createElement('th');
  return thTag;
}

function createTdTag(){
  var tdTag = document.createElement('td');
  return tdTag;
}

function createImageTag(){
  var imageTag = document.createElement('img');
  return imageTag;
}

function createH1Tag(){
  var h1Tag = document.createElement('h1');
  return h1Tag;
}

function createH2Tag(){
  var h2Tag = document.createElement('h2');
  return h2Tag;
}

function createH3Tag(){
  var h3Tag = document.createElement('h3');
  return h3Tag;
}

function createH4Tag(){
  var h4Tag = document.createElement('h4');
  return h4Tag;
}

function createH5Tag(){
  var h5Tag = document.createElement('h5');
  return h5Tag;
}

function createH6Tag(){
  var h6Tag = document.createElement('h6');
  return h6Tag;
}

function createPTag(){
  var pTag = document.createElement('p');
  return pTag;
}
