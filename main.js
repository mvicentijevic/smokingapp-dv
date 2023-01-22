const quitDateInfo = document.querySelector('#quitDateInfo');
const elapsed = document.querySelector('#elapsed');
const noCigarNumber = document.querySelector('#no-cigar-number');
const moneySaved = document.querySelector('#money-saved');

const dateInput = document.querySelector('[type="datetime-local"]');
const numCigarsInput = document.querySelector('#num-cigars');
const pricePerPack = document.querySelector('#price-per-pack');

initApp();

const saveBtn = document.querySelector('#saveBtn');

saveBtn.addEventListener('click', saveData);

function saveData() {
  let qd = moment(dateInput.value).format();
  let ppp = pricePerPack.value;
  let noc =  numCigarsInput.value;  

  localStorage.newQuitDate = qd;
  localStorage.pricePerPack = ppp;
  localStorage.numberOfCigars = noc;

  displayQuitDate();
  displaylastCigarette();
  displayCigaretteNotSmoked();
  displayMoneySaved();
}

function displayQuitDate() {
  quitDateInfo.innerHTML = moment(localStorage.newQuitDate).format('LLL');
}

function displaylastCigarette() {
  elapsed.innerHTML = moment(localStorage.newQuitDate).fromNow();
}

function displayCigaretteNotSmoked() {
  let cigarPerMinute = (parseInt(localStorage.numberOfCigars) / 24) / 60;
  let qd = moment(localStorage.newQuitDate);
  let now = moment();
  let minutes = now.diff(qd,'minutes'); // razlika u minutama
  noCigarNumber.innerHTML = (cigarPerMinute * minutes).toFixed(0);
}

function displayMoneySaved() {
  let priceOfOneCigar = parseInt(localStorage.pricePerPack) / 20;
  let qd = moment(localStorage.newQuitDate);
  let now = moment();
  let minutes = now.diff(qd,'minutes'); // razlika u minutama
  let hourSaved = (priceOfOneCigar * parseInt(localStorage.numberOfCigars)) / 24;
  let minuteSaved = hourSaved / 60;
  moneySaved.innerHTML = (minuteSaved * minutes).toFixed(2);
}

function initApp() {
  if (localStorage.newQuitDate) {
    displayQuitDate();
    displaylastCigarette();
    displayCigaretteNotSmoked();
    displayMoneySaved();

    let loop1 = setInterval(displaylastCigarette, 10000);
    let loop2 = setInterval(displayCigaretteNotSmoked, 10000);
    let loop3 = setInterval(displayMoneySaved, 10000);
  }
}