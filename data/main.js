import ancientsData from "../data/ancients.js";
import difficulties from "../data/difficulties.js";

function displayAncients() {
  ancientsData.map((item) => {
    document.querySelector(
      ".choose-cards"
    ).innerHTML += `<img id=${item.id} src = "./assets/Ancients/${item.cardFace}"></img>`;
  });
}
displayAncients();

const image = document.querySelector(".choose-cards").querySelectorAll("img");
let chosenCard = "";
image.forEach((i) => {
  i.addEventListener("click", () => {
    chosenCard = i.id;
    document.querySelector(".tracker-div").style.display = "inline-block";
    displayTracker();
    calculateRequiredColorCounts(chosenCard);
  });
});

function displayTracker() {
  ancientsData.map((item) => {
    if (item.id == chosenCard) {
      document.querySelector(".tracker-div").innerHTML = `
          <h2>TRACKER</h2>
          <h3>Stage one</h3>
          <span class="span-one span1">${item.firstStage.greenCards}</span>
          <span class="span-two">${item.firstStage.brownCards}</span>
          <span class="span-three">${item.firstStage.blueCards}</span>
          <h3>Stage Two</h3>
          <span class="span-one">${item.secondStage.greenCards}</span>
          <span class="span-two">${item.secondStage.brownCards}</span>
          <span class="span-three">${item.secondStage.blueCards}</span>
          <h3>Stage Three</h3>
          <span class="span-one">${item.thirdStage.greenCards}</span>
          <span class="span-two">${item.thirdStage.brownCards}</span>
          <span class="span-three">${item.thirdStage.blueCards}</span>`;
    }
  });
}

import brownCards from "../data/mythicCards/brown/index.js";
import blueCards from "../data/mythicCards/blue/index.js";
import greenCards from "../data/mythicCards/green/index.js";

// only accepts values in string: easy, normal, hard. By deflault, easy cards will be shuffled.
let difficultyLevel;

const easy = document.getElementById("easy");
const medium = document.getElementById("medium");
const hard = document.getElementById("hard");

document.getElementById("easy").addEventListener("click", () => {
  easy.style.backgroundColor = "#ff6633";
  hard.style.backgroundColor = "#b34700";
  medium.style.backgroundColor = "#b34700";
  if (chosenCard == "") {
    alert("Please, choose an Antient Card!");
  }
  difficultyLevel = "easy";
});

document.getElementById("medium").addEventListener("click", () => {
  medium.style.backgroundColor = "#ff6633";
  easy.style.backgroundColor = "#b34700";
  hard.style.backgroundColor = "#b34700";

  if (chosenCard == "") {
    alert("Please, choose an Antient Card!");
  }
  difficultyLevel = "normal";
  neededCardAmoutMedium();
});

document.getElementById("hard").addEventListener("click", () => {
  hard.style.backgroundColor = "#ff6633";
  medium.style.backgroundColor = "#b34700";
  easy.style.backgroundColor = "#b34700";
  if (chosenCard == "") {
    alert("Please, choose an Antient Card!");
  }
  difficultyLevel = "hard";
  neededCardAmoutHard();
});

let easyCards = [];
let mediumCards = [];
let hardCards = [];

let allCards = [...brownCards, ...blueCards, ...greenCards];

function sortCards() {
  allCards.forEach((item) => {
    if (item.difficulty == "easy") {
      easyCards.push(item);
    } else if (item.difficulty == "normal") {
      mediumCards.push(item);
    } else if (item.difficulty == "hard") {
      hardCards.push(item);
    }
  });
}

sortCards();

let requiredGreenCount = 0,
  requiredBrownCount = 0,
  requiredBlueCount = 0;

function calculateRequiredColorCounts(chosenElderCardId) {
  let chosenElderCard = ancientsData.find((elderCard) => {
    return elderCard.id === chosenElderCardId;
  });
  requiredGreenCount =
    chosenElderCard.firstStage.greenCards +
    chosenElderCard.secondStage.greenCards +
    chosenElderCard.thirdStage.greenCards;
  requiredBrownCount =
    chosenElderCard.firstStage.brownCards +
    chosenElderCard.secondStage.brownCards +
    chosenElderCard.thirdStage.brownCards;
  requiredBlueCount =
    chosenElderCard.firstStage.blueCards +
    chosenElderCard.secondStage.blueCards +
    chosenElderCard.thirdStage.blueCards;
}

let greenCardsEasy = [],
  blueCardsEasy = [],
  brownCardsEasy = [],
  restBrownCardsEasy = [],
  neededEasyCardAmount = [];

function neededCardAmoutEasy() {
  let lenGreenEasy = easyCards.length,
    randNumGreenEasy;
  do {
    randNumGreenEasy = Math.floor(Math.random() * lenGreenEasy);
    if (easyCards[randNumGreenEasy].color == "green") {
      greenCardsEasy.push(easyCards[randNumGreenEasy]);
    }
  } while (greenCardsEasy.length < requiredGreenCount);

  let lenBlueEasy = easyCards.length,
    randNumBlueEasy;
  do {
    randNumBlueEasy = Math.floor(Math.random() * lenBlueEasy);
    if (easyCards[randNumBlueEasy].color == "blue") {
      blueCardsEasy.push(easyCards[randNumBlueEasy]);
    }
  } while (blueCardsEasy.length < requiredBlueCount);

  easyCards.map((item) => {
    if (item.color == "brown") {
      brownCardsEasy.push(item);
    }
  });

  let lenBrownEasy = mediumCards.length,
    randNumBrownEasy;
  do {
    randNumBrownEasy = Math.floor(Math.random() * lenBrownEasy);
    if (mediumCards[randNumBrownEasy].color == "brown") {
      restBrownCardsEasy.push(mediumCards[randNumBrownEasy]);
    }
  } while (restBrownCardsEasy.length < requiredBrownCount - 5);

  neededEasyCardAmount = [
    ...greenCardsEasy,
    ...blueCardsEasy,
    ...brownCardsEasy,
    ...restBrownCardsEasy,
  ];
}

let fiveGreenCardsMedium = [],
  twoBlueCardsMedium = [],
  nineBrownCardsMedium = [],
  neededMediumCardAmount = [];

function neededCardAmoutMedium() {
  let lenGreenMedium = mediumCards.length,
    randNumGreenMedium;
  do {
    randNumGreenMedium = Math.floor(Math.random() * lenGreenMedium);
    if (mediumCards[randNumGreenMedium].color == "green") {
      fiveGreenCardsMedium.push(mediumCards[randNumGreenMedium]);
    }
  } while (fiveGreenCardsMedium.length < requiredGreenCount);

  let lenBlueMedium = mediumCards.length,
    randNumBlueMedium;
  do {
    randNumBlueMedium = Math.floor(Math.random() * lenBlueMedium);
    if (mediumCards[randNumBlueMedium].color == "blue") {
      twoBlueCardsMedium.push(mediumCards[randNumBlueMedium]);
    }
  } while (twoBlueCardsMedium.length < requiredBlueCount);

  let lenBrownMedium = mediumCards.length,
    randNumBrownMedium;
  do {
    randNumBrownMedium = Math.floor(Math.random() * lenBrownMedium);
    if (mediumCards[randNumBrownMedium].color == "brown") {
      nineBrownCardsMedium.push(mediumCards[randNumBrownMedium]);
    }
  } while (nineBrownCardsMedium.length < requiredBrownCount);

  neededMediumCardAmount = [
    ...fiveGreenCardsMedium,
    ...nineBrownCardsMedium,
    ...twoBlueCardsMedium,
  ];
}

let fiveGreenCardsHard = [],
  twoBlueCardsHard = [],
  nineBrownCardsHard = [],
  neededHardCardAmount = [];

function neededCardAmoutHard() {
  let lenGreenHard = hardCards.length,
    randNumGreenHard;
  do {
    randNumGreenHard = Math.floor(Math.random() * lenGreenHard);
    if (hardCards[randNumGreenHard].color == "green") {
      fiveGreenCardsHard.push(hardCards[randNumGreenHard]);
    }
  } while (fiveGreenCardsHard.length < requiredGreenCount);

  let lenBlueHard = hardCards.length,
    randNumBlueHard;
  do {
    randNumBlueHard = Math.floor(Math.random() * lenBlueHard);
    if (hardCards[randNumBlueHard].color == "blue") {
      twoBlueCardsHard.push(hardCards[randNumBlueHard]);
    }
  } while (twoBlueCardsHard.length < requiredBlueCount);

  let lenBrownHard = hardCards.length,
    randNumBrownHard;
  do {
    randNumBrownHard = Math.floor(Math.random() * lenBrownHard);
    if (hardCards[randNumBrownHard].color == "brown") {
      nineBrownCardsHard.push(hardCards[randNumBrownHard]);
    }
  } while (nineBrownCardsHard.length < requiredBrownCount);

  neededHardCardAmount = [
    ...nineBrownCardsHard,
    ...fiveGreenCardsHard,
    ...twoBlueCardsHard,
  ];
}
document.getElementById("shuffle-id").addEventListener("click", () => {
  if (difficultyLevel == "easy") {
    // to do: call shuffling logic spesific for this level and show nex button
    neededCardAmoutEasy();
    const nextBtn = document.getElementById("next-id");
    nextBtn.style.display = "inline-block";
  } else if (difficultyLevel == "normal") {
    // to do: call shuffling logic spesific for this level and show nex button
    neededCardAmoutMedium();
    const nextBtn = document.getElementById("next-id");
    nextBtn.style.display = "inline-block";
  } else if (difficultyLevel == "hard") {
    // to do: call shuffling logic spesific for this level and show nex button
    neededCardAmoutHard();
    const nextBtn = document.getElementById("next-id");
    nextBtn.style.display = "inline-block";
  }
});
document.getElementById("next-id").addEventListener("click", () => {
  if (difficultyLevel == "easy") {
    let length = neededEasyCardAmount.length,
      randomNumber;
    randomNumber = Math.floor(Math.random() * length);
    document.querySelector(
      ".shuffled-card"
    ).innerHTML = `<img src='../assets/MythicCards/${neededEasyCardAmount[randomNumber].color}/${neededEasyCardAmount[randomNumber].cardFace}'></img>`;
  } else if (difficultyLevel == "normal") {
    let length = neededMediumCardAmount.length,
      randomNumber;
    randomNumber = Math.floor(Math.random() * length);
    document.querySelector(
      ".shuffled-card"
    ).innerHTML = `<img src='../assets/MythicCards/${neededMediumCardAmount[randomNumber].color}/${neededMediumCardAmount[randomNumber].cardFace}'></img>`;
  } else if (difficultyLevel == "hard") {
    let length = neededHardCardAmount.length,
      randomNumber;
    randomNumber = Math.floor(Math.random() * length);
    document.querySelector(
      ".shuffled-card"
    ).innerHTML = `<img src='../assets/MythicCards/${neededHardCardAmount[randomNumber].color}/${neededHardCardAmount[randomNumber].cardFace}'></img>`;
  } else {
    alert("Please, choose difficulty level!");
  }
});

// function createSmallDecks(){
//   if (chosenCard.name =="azaroth")
// }
// createSmallDecks()
