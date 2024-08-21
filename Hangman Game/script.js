// letters
const letters = "abcdefghijklmnopqrstuvwxyz";
let lettersArr = Array.from(letters);
let lettersContainer = document.querySelector(".letters-col");
//generate letters
lettersArr.forEach((letter) => {
  lettersContainer.innerHTML += `<span class="letter-box">${letter}</span>`;
});
//=======================================================================================
// objects of words + categories
const words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "r",
    "mysql",
    "python",
  ],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  people: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Ghandi",
  ],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};
// get random category
let allKeys = Object.keys(words);
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropNumber];
let categoryName = document.querySelector(".category span");
categoryName.innerHTML = randomPropName;
let randomPropValue = words[randomPropName];
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
let randomValueName = randomPropValue[randomValueNumber];
//=====================================================================================
// convert chossen word to array
let lettersGuessContainer = document.querySelector(".letters-guess");
let lettersAndSpace = Array.from(randomValueName);
lettersAndSpace.forEach((letter) => {
  let emptySpan = document.createElement("span");
  if (letter == " ") {
    emptySpan.className = "with-space";
  }
  lettersGuessContainer.appendChild(emptySpan);
});
//=====================================================================================
// handle clicking on letters
let guessSpans = document.querySelectorAll(".letters-guess span");
let wrongAttempts = 0;
let drawElement = document.querySelector(".hangman-draw");
let gameStatus = document.querySelector(".game-status");

document.addEventListener("click", (e) => {
  let state = false;
  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");
    //get clicked letter
    let clickedLetter = e.target.innerText.toLowerCase();
    let chosenWord = Array.from(randomValueName.toLowerCase());
    chosenWord.forEach((letter, letterIndex) => {
      if (clickedLetter === letter) {
        state = true;
        guessSpans.forEach((span, spanIndex) => {
          if (letterIndex == spanIndex) {
            span.innerHTML = clickedLetter;
          }
        });
        let emptySpans = Array.from(guessSpans).filter( (span) =>{
            return span.innerHTML == "" ;
        });
        if(emptySpans.length == 0){
            gameEnd('win');
        }
      }
    });
    if (!state) {
      wrongAttempts++;
      drawElement.classList.add(`wrong-${wrongAttempts}`);
      if (wrongAttempts == 8) {
        gameEnd('lose');
      }
    }
  }
});

function gameEnd(status){
    let letterBoxes = document.querySelectorAll(".letter-box");
    letterBoxes.forEach((box) => {
        box.classList.add("clicked");
    });
    if(status == 'win'){
        gameStatus.style.cssText =
        "color : green ; font-weight:bold ; font-size : 25px ; text-align:center";
        gameStatus.innerText = "CONGRATULATIONS";
    }else{
        gameStatus.style.cssText =
        "color : red ; font-weight:bold ; font-size : 25px ; text-align:center";
        gameStatus.innerText = "GAME OVER";
    }  
}