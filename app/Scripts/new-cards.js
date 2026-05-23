import { Card } from "./card.js";
import { getDeck, clickedDeck, links } from "./storage.js";
import { lang } from "./lang.js";

function getCardInput() {
    let front = document.getElementById("front").value;
    let back = document.getElementById("back").value;

    return [front, back];
}

// Création d'une carte et ajout dans le paquet si l'entrée est valide.
function createCard() {
    const deck = getDeck(clickedDeck);
    let [front, back] = getCardInput();
    let validInput = validCardInput(front, back);

    if (validInput) {
        let card = new Card(front, back);

        deck.cards.push(card);
        deck.saveDeck();
        emptyField();
        validationMessage();
    } else {
        alert("Carte invalide");
    }
}

function validCardInput(front, back) {
    let lenghtLimit = 3500;

    if (front.length > lenghtLimit || front.length == 0) {
        return false;
    } else if (back.length > lenghtLimit || back.length == 0) {
        return false
    } else return true;
}

function inputValidation(id) {
    let lenghtLimit = 3500;
    let value = document.getElementById(id).value;
    let checkDuplicate = document.getElementById("limitMessage");

    if (value.length >= lenghtLimit) {
        limitReachedMessage(checkDuplicate);
    } else if (value.length < lenghtLimit && checkDuplicate) checkDuplicate.remove();
}

// Limite les saisies si la limite est atteinte. 
function checkInput(event, element) {
    let lenghtLimit = 3500;
    let value = document.getElementById(element).value;

    if (value.length >= lenghtLimit) {
        event.preventDefault();
    }
}

function limitReachedMessage(condition) {
    if (!condition) {
        let message = document.createElement("div");
        message.textContent = `${lang.translate("limit-message")}`;
        message.className = "invalid-input-message";
        message.id = "limitMessage";
        message.setAttribute("data-i18n", "limit-message")
        document.getElementById("createCard").insertBefore(message, document.getElementById("createCardInput"));
    }
}

function emptyField() {
    document.getElementById("front").value = "";
    document.getElementById("back").value = "";
}

// Affichage d'un message lors de la création d'une carte.
function validationMessage() {
    let message = document.createElement("div");
    message.textContent = `${lang.translate("card-created")}` || "Card added";
    message.className = "validation-message";

    document.getElementById("createCard").insertBefore(message, document.getElementById("addCard"));

    setTimeout(() => { message.remove() }, 2000);
}

function attachEvents() {
    document.getElementById("backMenu").addEventListener("click", () => window.location.href = links.menu);
    document.getElementById("addCard").addEventListener("click", createCard);
    document.getElementById("front").addEventListener("input", () => inputValidation("front"));
    document.getElementById("back").addEventListener("input", () => inputValidation("back"));
    document.getElementById("front").addEventListener("keypress", (event) => checkInput(event, "front"));
    document.getElementById("back").addEventListener("keypress", (event) => checkInput(event, "back"));
}

attachEvents();
document.getElementById("deckTitle").textContent = clickedDeck;


