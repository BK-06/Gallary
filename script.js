// Please remove local storage data then refresh to restart again or just start from first image without any refresh.

"use strict";

let currentImg = "img-1"; // local storage reference

(function () {
  const stage = localStorage.getItem("stage");
  if (!stage) {
    localStorage.setItem("stage", currentImg);
  } else {
    currentImg = stage;
  }
  console.log(currentImg);
})();

const validateImageClick = (stage) => {
  const key = "img-" + stage;
  if (key !== currentImg) {
    throw new Error("Not allowed");
  }
  /*
    (if (key !== currentImg) {
    throw new Error("Not allowed");
  }) 
  // 
   */
};

const setStage = (stage) => {
  const key = "img-" + stage;
  currentImg = key;
  localStorage.setItem("stage", key);
};
const imagesEl = document.querySelectorAll(".img");
let imagesArr = Array.from(imagesEl);

for (let [i, img] of imagesArr.entries()) {
  img.setAttribute("id", `img-${++i}`);
}

let imageFirst = document.getElementById("img-1");
let imageSecond = document.getElementById("img-2");
let imageThird = document.getElementById("img-3");
let imageFourth = document.getElementById("img-4");

let count = 1;

imageFirst.addEventListener("click", createForm);

function createForm() {
  validateImageClick(1);
  // console.log(c)
  if (count !== 1) {
    return;
  }
  count++;
  window.location.href = "form.html";
}

imageSecond.addEventListener("click", displayName);

let count2 = 1;
function displayName() {
  validateImageClick(2);
  if (count2 > 1) {
    return;
  }
  count2++;
  let data = JSON.parse(localStorage.getItem("data"));
  console.log(data);
  let sectionEl = document.createElement("section");
  let name = document.createElement("h3");
  name.setAttribute("class", "h3-name");
  name.setAttribute("class", "h3-name");
  let userName = document.createElement("h3");
  userName.setAttribute("class", "h3-userName");
  for (let t of data) {
    name.innerHTML = `Name : ${t[0]}`;
    userName.innerHTML = `User Name : ${t[1]}`;
    sectionEl.appendChild(name);
    sectionEl.appendChild(userName);
  }
  document.body.appendChild(sectionEl);
  setStage(3);
}

imageThird.addEventListener("click", diceFunction);

let z = 1;
let diceEl = document.getElementById("dice");
let game = document.querySelectorAll(".game");
for (let el of game) {
  el.setAttribute("id", `roll-${z++}`);
  // console.log(el);
}
diceEl.addEventListener("click", rollFunction);
//
function diceFunction() {
  validateImageClick(3);
  let name = document.querySelector(".h3-name");
  let userName = document.querySelector(".h3-userName");
  name.classList.add("hidden");
  userName.classList.add("hidden");

  let diceMsg = document.querySelector(".dice-msg");
  diceMsg.classList.remove("hidden");
  let diceEl = document.getElementById("dice");
  diceEl.classList.remove("hidden");
  let diceRoll = document.querySelector(".dice-roll");
  diceRoll.classList.remove("hidden");
}

let count4 = 1;
let count3 = 1;
let sum = 0;
let rollCount = 1;
let sumEl = document.createElement("h3");
sumEl.style.cssText = "display : flex; color : red ";
sumEl.innerHTML = "";
document.body.appendChild(sumEl);

function setDiceText(diceRoll, randomNumber, sum) {
  diceRoll.innerHTML = `Roll Count : ${
    count3 - 1
  } and Rolled : ${randomNumber} Total Sum : ${sum}`;
}
function rollFunction() {
  validateImageClick(3);
  if (count3 > 3) {
    return;
  }
  count3++;

  let randomNumber = Math.trunc(Math.random() * 6 + 1);
  sum = sum + randomNumber;
  let diceRoll = document.querySelector(".dice-roll");
  setDiceText(diceRoll, randomNumber, sum);
  console.log(randomNumber, sum);
  if (count3 === 4) {
    if (sum > 10) {
      setStage(4);
    } else {
      if (rollCount > 1) {
        alert("Bad luck");
        throw new Error("Bad luck");
        setStage(1);
      }
      count3 = 1;
      randomNumber = "?";
      sum = 0;
      setDiceText(diceRoll, randomNumber, sum);
      rollCount += 1;
      alert("Please try again");
    }
  }
}

imageFourth.addEventListener("click", checkFunction);
function checkFunction() {
  validateImageClick(4);
  setStage(1);
  if (sum <= 10) {
    return window.alert(
      "Since Your three rolls total is less than 10, please restart from 3rd Image."
    );
  }
  if (count4 > 1) {
    return;
  }
  count4++;

  let successEl = document.querySelector(".success");
  successEl.classList.remove("hidden");
  let diceMsg = document.querySelector(".dice-msg");
  diceMsg.classList.add("hidden");
  let diceEl = document.getElementById("dice");
  diceEl.classList.add("hidden");
  let diceRoll = document.querySelector(".dice-roll");
  diceRoll.classList.add("hidden");
  let token = crypto.randomUUID();
  let final = document.createElement("h3");
  final.innerHTML = `Your token is ${token.slice(0, 12)}`;
  document.body.appendChild(final);
}

// code will work firsttime two test second time please follow below caution,
//even after you refresh there is still data in local storage,  Please clear local storage everytime you test.. after clearing local storage refresh again.
// inspect => >> => application
