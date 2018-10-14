import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import { me as device } from "device";
import * as simpleSettings from "./settings";

clock.granularity = "minutes";

let initialized = false;

let background;
let houra = [];
let hourb = [];
let minute = [];
let second = [];

let lastDate;

let backgroundColor = "black";
let inactiveGridColor = "grey";
let gridColor = "red";

function settingsCallback(data) {
  if (!data) {
    return;
  }

  if (data.backgroundColor !== undefined) backgroundColor = data.backgroundColor;
  if (data.inactiveGridColor !== undefined) inactiveGridColor = data.inactiveGridColor;
  if (data.activeGridColor !== undefined) gridColor = data.activeGridColor;
  
  onActualTick(lastDate);
}

simpleSettings.initialize(settingsCallback);

function loadElements() {
  background = document.getElementById("background");
  houra.push(document.getElementById("0-0-0"));
  houra.push(document.getElementById("0-0-2"));
  houra.push(document.getElementById("0-0-4"));
  hourb.push(document.getElementById("1-3-0"));
  hourb.push(document.getElementById("1-3-2"));
  hourb.push(document.getElementById("1-3-4"));
  hourb.push(document.getElementById("1-5-0"));
  hourb.push(document.getElementById("1-5-2"));
  hourb.push(document.getElementById("1-5-4"));
  hourb.push(document.getElementById("1-7-0"));
  hourb.push(document.getElementById("1-7-2"));
  hourb.push(document.getElementById("1-7-4"));
  minute.push(document.getElementById("2-10-0"));
  minute.push(document.getElementById("2-10-2"));
  minute.push(document.getElementById("2-10-4"));
  minute.push(document.getElementById("2-12-0"));
  minute.push(document.getElementById("2-12-2"));
  minute.push(document.getElementById("2-12-4"));
  second.push(document.getElementById("3-15-0"));
  second.push(document.getElementById("3-15-2"));
  second.push(document.getElementById("3-15-4"));
  second.push(document.getElementById("3-17-0"));
  second.push(document.getElementById("3-17-2"));
  second.push(document.getElementById("3-17-4"));
  second.push(document.getElementById("3-19-0"));
  second.push(document.getElementById("3-19-2"));
  second.push(document.getElementById("3-19-4"));
  initialized = true;
}

function getPixel(id) {
  let element = document.getElementById(id);
  return element;
}

function clearAll() {
  for (var i=0; i<houra.length; i++) { houra[i].style.fill = inactiveGridColor; }
  for (var i=0; i<hourb.length; i++) { hourb[i].style.fill = inactiveGridColor; }
  for (var i=0; i<minute.length; i++) { minute[i].style.fill = inactiveGridColor; }
  for (var i=0; i<second.length; i++) { second[i].style.fill = inactiveGridColor; }
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

clock.ontick = (evt) => {
  onTick(evt);
}

function onTick(evt) {
  lastDate = evt.date;
  onActualTick(evt.date);
}

function onActualTick(today) {
  if (!today) return

  let hours = today.getHours() % 12 || 12;
  let mins = today.getMinutes();
  
  if (!initialized) {
    loadElements();
  }

  background.style.fill = backgroundColor;

  let shours = hours.toString();
  let smins = mins.toString();
  
  let group0 = shours.length < 2 ? 0 : 1;
  let group1 = shours.length === 2 ? parseInt(shours.charAt(1)) : parseInt(shours.charAt(0));
  let group2 = smins.length === 2 ? parseInt(smins.charAt(0)) : 0;
  let group3 = smins.length === 2 ? parseInt(smins.charAt(1)) : parseInt(smins.charAt(0));
  
  clearAll();
  
  shuffleArray(houra);
  shuffleArray(hourb);
  shuffleArray(minute);
  shuffleArray(second);
  
  for (var i=0; i<group0; i++) { houra[i].style.fill = gridColor; }
  for (var i=0; i<group1; i++) { hourb[i].style.fill = gridColor; }
  for (var i=0; i<group2; i++) { minute[i].style.fill = gridColor; }
  for (var i=0; i<group3; i++) { second[i].style.fill = gridColor; }
}