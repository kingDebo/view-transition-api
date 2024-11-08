const cardsWrapper = document.getElementById("cards-wrapper");
const button = document.getElementById("add-btn");
let cardslist = document.getElementsByClassName("card");
let lastIndex = cardslist.length;

button.addEventListener("click", async (e) => addCard());
initListeners();

function initListeners() {
  Array.from(cardslist).forEach((card) => {
    card.firstElementChild.addEventListener("click", (event) => {
      removeCard(event.target);
    });
  });
}

function addCard() {
  if (!document.startViewTransition()) {
    createCard();
    cardslist = document.getElementsByClassName("card");
    return;
  }

  const animateDOM = document.startViewTransition(() => {
    createCard();
  });

  animateDOM.finished
    .then(() => {
      const newEl = document.getElementsByClassName("new-card")[0];
      newEl.classList.remove("new-card");
    })
    .catch((e) => {
      console.error("Error animating card: ", e);
    });
}

function removeCard(card) {
  if (!document.startViewTransition()) {
    destroyCard();
    cardslist = document.getElementsByClassName("card");
    return;
  }
  card.parentElement.classList.add("old-card");

  document.startViewTransition(() => {
    destroyCard(card);
  });
}

function destroyCard(card) {
  card.parentElement.remove();
}

function createCard() {
  lastIndex += 1;
  /* create  card element */
  const newEl = document.createElement("div");

  const index = lastIndex;

  /* Apply styles */
  newEl.dataset.index = index;
  newEl.classList.add(`new-card`); //Class used to animate in
  newEl.classList.add(`card`); //Base styles for all cards
  newEl.style.viewTransitionName = `item${index}`;
  newEl.style.backgroundColor = generatePastelColor();

  /* Create close button */
  const closeButton = document.createElement("div");
  closeButton.innerText = "-";

  closeButton.addEventListener("click", (e) => {
    removeCard(e.target);
  });

  newEl.appendChild(closeButton); //add close button to card
  cardsWrapper.appendChild(newEl); //add card to parent list
}

function generatePastelColor() {
  // Generate random values between 127 and 255 for each RGB component
  const r = Math.floor(Math.random() * 128) + 127;
  const g = Math.floor(Math.random() * 128) + 127;
  const b = Math.floor(Math.random() * 128) + 127;

  // Convert the RGB values to a hex color string
  return `rgb(${r}, ${g}, ${b})`;
}
