const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copybtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator= document.querySelector("[data-indicator]");
const generateBtn= document.querySelector(".generateButton");
const allCheckBox= document.querySelector("input[type=checkbox]");

let password ="";
let passwordLength = 10;
let checkCount = 1;
hadleSlider();
// set strength circle color to gray

// set password length
function hadleSlider(){
    inputSlider.value= passwordLength;
    lengthDisplay.innerText = passwordLength;
}


function setIndicator(color){
    indicator.getElementsByClassName.backgroundColor = color;
    // shadow
}

function getRndInteger(min,max){
  return Math.floor(Math.random()*(max-min))+min;
}



