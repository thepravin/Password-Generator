const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copybtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector(".data-indicator");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox");
const symbols = '~`!@#$%^&*()_-+={[}];:"<,>.?/';

let password = "";
let passwordLength = 10;
let checkCount = 0;
hadleSlider();
// set strength circle color to gray
setIndicator("#ccc");

// set password length
function hadleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}

function setIndicator(color) {
    indicator.style.backgroundColor = color;
    // shadow
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateRndNumber() {
    return getRndInteger(0, 9);
}

function generateLowerCase() {
    return String.fromCharCode(getRndInteger(97, 123)); // ASCI values of lowercase
}
function generateUpperCase() {
    return String.fromCharCode(getRndInteger(65, 91)); // ASCI values of uppercase
}

function generateSymbols() {
    const randNum = getRndInteger(0, symbols.length);
    return symbols.charAt(randNum);
}

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;

    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;

    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
        setIndicator("#0f0");
    } else if (
        (hasLower || hasUpper) &&
        (hasNum || hasSym) &&
        passwordLength >= 6
    ) {
        setIndicator("#ff0");
    } else {
        setIndicator("#f00");
    }
}


async function copyContent(){
try{
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText="copied";
}
catch(e){
    copyMsg.innerText="failed"
}

copyMsg.classList.add("active");

setTimeout( () => {
    copyMsg.classList.remove("active");
    
} ,2000);

}

inputSlider.addEventListener('input',(e) =>{
    passwordLength = e.target.value;
    hadleSlider();
})

copybtn.addEventListener('click',() =>{
    if(passwordDisplay.value)
    copyContent();
})


function handleCheckBoxChange(){
    checkCount =0;
    allCheckBox.forEach( (checkbox) => {
        if(checkbox.checked)
        checkCount++;
    })
    //special condition
    if(passwordLength<checkCount){
        passwordLength = checkCount;
        hadleSlider();
    }
}
allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change',handleCheckBoxChange);
})

function shufflePassword(array){
    // Fisher Yates Method
    for(let i=array.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        const temp = array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    let str = "";
    array.forEach((el)=>(str+=el));
    return str;

}

generateBtn.addEventListener('click',() =>{
    // none of the checkbox are selected
    if(checkCount ==0)
        return;

    if(passwordLength < checkCount){
        passwordLength = checkCount;
        hadleSlider();
    }

    //let's start the journey to find new password
    console.log("Starting the Journey");

    // remove old password
    password = " "

    //let's put the stuff mentioned by checkboxes
 /*    if(uppercaseCheck.checkbox){
        password += generateUpperCase();
    }
    if(lowercaseCheck.checkbox){
        password += generateLowerCase();
    }
    if(numbersCheck.checkbox){
        password += generateRndNumber();
    }
    if(symbolsCheck.checkbox){
        password += generateSymbols();
    } */

    let funCArr = [];
    
    if(uppercaseCheck.checked)
        funCArr.push(generateUpperCase);
    if(lowercaseCheck.checked)
        funCArr.push(generateLowerCase);
    if(numbersCheck.checked)
        funCArr.push(generateRndNumber);
    if(symbolsCheck.checked)
        funCArr.push(generateSymbols);

        // compulsory addition
        for(let i=0;i<funCArr.length;i++){
            password +=funCArr[i]();
        }
    console.log("Compulsory addition done");

        // remaining addition
        for (let i = 0; i < passwordLength-funCArr.length; i++) {
           let randIndex = getRndInteger(0,funCArr.length);
           password += funCArr[randIndex]();
            
        } 
    console.log("remaining addition done");

        // shuffle the password
        password = shufflePassword(Array.from(password));
        console.log("shuffling addition done");

        // show in UI
        passwordDisplay.value = password;
    console.log("UI addition done");

        // calculate strength
        calcStrength();

})