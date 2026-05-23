import { Deck } from "./deck.js";
import { Card } from './card.js';

// Initialisation de la date de révision.
function getDate() {
    let inStorage = localStorage.getItem("date") !== null;

    if (!inStorage) {
        let date = new Date();
        localStorage.setItem("date", JSON.stringify(date));
        date.setHours(23, 59);
        return date
    } else {
        let today = new Date();
        let data = JSON.parse(localStorage.getItem("date"));
        let date = new Date(data);
        if (date < today) date = today;

        date.setHours(23, 59);
        return date
    }
}

export let date = getDate();
export let clickedDeck = new URLSearchParams(window.location.search).get("deck");

// Initialisation de la liste de paquets.
export function getDeckList() {
    if (!localStorage.getItem("deckList")) {
        const deckList = {};
        localStorage.setItem("deckList", JSON.stringify(deckList));
        return deckList;
    } else {
        const deckList = JSON.parse(localStorage.getItem("deckList"));
        return deckList;
    }
}

// Création d'un paquet et ses cartes à partir des données sauvegardées.
export function getDeck(name) {
    let deckList = getDeckList();
    const deck = Deck.fromJSON(deckList[name]);
    const cards = deck.cards;

    for (let i = 0; i < cards.length; i++) {
        cards[i] = Card.fromJSON(cards[i]);
    }

    for (let i = 0; i < deck.review.length; i++) {
        deck.review[i] = Card.fromJSON(deck.review[i]);
    }

    return deck;
}

export const links = {
    checkReview: `./review-forecast.html`,
    manageCards: `./manage-cards.html`,
    menu: `./menu.html`,
    index : `/`,

    createCard(name) {
        window.location.href = `./new-card.html?deck=${encodeURIComponent(name)}`;
    },

    review(name) {
        window.location.href = `./review-card.html?deck=${encodeURIComponent(name)}`;
    }
}

