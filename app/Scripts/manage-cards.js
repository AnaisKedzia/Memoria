import { getDeck, getDeckList, links } from "./storage.js";
import { lang } from "./lang.js";

// Initialisation de la liste de paquets.
const list = {
    initialize() {
        const decks = getDeckList();
        let iterator = Object.keys(decks);

        if (iterator.length == 0) {
            this._emptyDeckList();
            return
        } else {
            iterator.forEach(deck => {
                let option = document.createElement("option");
                option.innerText = deck;

                document.getElementById("deckList").appendChild(option);
                this.getOption();
            })
        }
    },

    getOption() {
        let option = document.getElementById("deckList").value;
        display.cards(option);
        display.active();
    },

    modifyDeck(deck) {
    let deckList = getDeckList();
    let input = document.getElementById("editName").value.trim();

    if (input === deck) {
        return;
    } else if (input in deckList) {
        alert("Ce paquet existe déjà")
    } else if(input.length > 30) {
        let alerts = lang.translate("alerts");
        let alert = document.createElement("p");
        alert.id = "alert-message";
        alert.style.color = "var(--secondary-color)"
        alert.innerHTML = `${alerts["limit-reached"]}`;

        document.getElementById("card-list").insertBefore(alert, document.getElementById("searchBar"))

        return
    } else {
        deckList[input] = deckList[deck];
        deckList[input].name = input;
        delete deckList[deck];
        localStorage.setItem("deckList", JSON.stringify(deckList));
    }
    },

    _emptyDeckList() {
        let informationDisplay = document.getElementById("card-list");

        for (let i = 0; i < informationDisplay.childElementCount;) {
            informationDisplay.firstChild.remove();
        }

        let noDeck = document.createElement("h1");
        noDeck.setAttribute("data-i18n", "no-deck")
        noDeck.className = "no-deck-message";
        informationDisplay.appendChild(noDeck)
    }
}

const display = {
    emptyList: false,

    cards(deckName) {
        let cardDisplay = document.getElementById("cardDisplay");

        // Efface la liste précédente pour en afficher une nouvelle.
        for (let i = cardDisplay.childElementCount; i > 0; i--) {
            cardDisplay.removeChild(cardDisplay.childNodes[i]);
        }

        // Regroupe toutes les cartes et les affiche par date de création.
        const deck = getDeck(deckName);
        const cards = [...deck.cards, ...deck.review].sort((a, b) => {
            return (new Date(a.creationDate) >= new Date(b.creationDate)) ? 1 : -1
        })

        if (cards.length === 0) {
            this._emptyDeck();
        } else {
            cards.forEach(card => {
                let display = this._createCard(card);
                document.getElementById("cardDisplay").appendChild(display);
                this.emptyList = false;
            });
        }
    },

    _emptyDeck() {
        document.getElementById("front").value = "";
        document.getElementById("back").value = "";
        document.getElementById("front").placeholder = lang.translate("no-card");
        document.getElementById("back").placeholder = lang.translate("no-card");

        if (!document.getElementById("noCardInfo")) {
            let info = document.createElement("h1");
            info.innerHTML = `${lang.translate("deck-no-cards")}`;
            info.id = "noCardInfo";
            info.className = "no-deck-message"
            info.setAttribute("data-i18n", "deck-no-cards")

            document.getElementById("cardDisplay").appendChild(info);
        }

        this.emptyList = true;
    },

    _createCard(i) {
        let cardDisplay = document.createElement("div");
        cardDisplay.className = "card";
        cardDisplay.id = i.creationDate;
        cardDisplay.addEventListener("click", () => card.setActive(cardDisplay));

        let cardFront = document.createElement("p");
        cardFront.innerText = i.front;

        let cardBack = document.createElement("p");
        cardBack.innerText = i.back;

        cardDisplay.appendChild(cardFront);
        cardDisplay.appendChild(cardBack);

        return cardDisplay
    },

    // Affichage du contenu de la carte sélectionnée.
    fillTextArea(card) {
        let front = document.getElementById("front");
        let back = document.getElementById("back");

        front.value = card.childNodes[0].textContent;
        back.value = card.childNodes[1].textContent;
    },

    active() {
        let active = document.querySelector(".card.active");
        let cardDisplay = document.getElementById("cardDisplay");
        let deck = getDeck(document.getElementById("deckList").value);
        let cardNumber = deck.cards.length + deck.review.length;

        if (!active) {
            if (cardNumber === 0) {
                this._emptyDeck();
                return
            } else if (!this.emptyList && cardDisplay.childElementCount !== 0) {
                document.querySelector(".card")?.classList.add("active");
            } else {
                this.noMatch();
                return
            }
        }

        this.fillTextArea(document.querySelector(".card.active"));
        this._deleteButton();
    },

    _deleteButton() {
        let button = document.createElement("button");
        button.innerText = "X";
        button.className = "delete-card-button";
        button.id = "deleteButton";
        button.addEventListener("click", card.deleteCard)

        if (document.getElementById("deleteButton")) document.getElementById("deleteButton").remove();

        document.querySelector(".card.active").appendChild(button);
    },

    searchResults(card, result) {
        let cardDisplay = document.getElementById("cardDisplay");

        let testedCard = document.getElementById(card.creationDate);
        if (result === null && testedCard) {
            testedCard.remove();
        } else if (result !== null && !testedCard) {
            let match = display._createCard(card);
            cardDisplay.appendChild(match);
        } else return;
    },

    noMatch() {
        let cardDisplay = document.getElementById("cardDisplay");

        if (cardDisplay.childElementCount === 0) {
            let noFound = document.createElement("h1");
            noFound.setAttribute("data-i18n", "no-match");
            noFound.innerHTML = `${lang.translate("no-match")}`;
            noFound.id = "noFound";
            noFound.className = "no-deck-message";
            cardDisplay.appendChild(noFound);
        }
    },

    editDeckName() {
        document.getElementById("alert-message")?.remove();

        let deckList = document.getElementById("deckList")
        let deck = deckList.value;
        deckList.remove();
        document.getElementById("edit").remove();

        let inputBar = document.createElement("input");
        inputBar.type = "text";
        inputBar.value = deck;
        inputBar.id = "editName";
        inputBar.className = "edit-name"

        let validIcon = document.createElement("img");
        validIcon.src = "/Images/check.svg"
        validIcon.className = "valid";
        validIcon.id = "valid";
        validIcon.addEventListener("click", () => { 
            list.modifyDeck(deck);
            display.deckList(inputBar, validIcon);
            list.initialize();
         })

        document.getElementById("deckListDiv").appendChild(inputBar);
        document.getElementById("deckListDiv").appendChild(validIcon);

        inputBar.focus();
    }, 

    deckList(bar, icon) {
        let deckList = document.getElementById("deckListDiv");

        let selectList = document.createElement("select");
        selectList.id = "deckList";
        selectList.className = "deck-select";
        selectList.addEventListener("change", () => {
            list.getOption();
        })

        let editIcon = document.createElement("img");
        editIcon.src = "/Images/edit.svg";
        editIcon.id = "edit";
        editIcon.className = "icon";
        editIcon.addEventListener("click", display.editDeckName)

        bar.remove();
        icon.remove();

        deckList.appendChild(selectList);
        deckList.appendChild(editIcon);
    },

    characterLimit() {
        let alerts = lang.translate("alerts");

        let message = document.createElement("p");
        message.innerHTML = `${alerts["limit-reached"]}`;
        message.id = "alert";
        document.getElementById("card-display").insertBefore(message, document.getElementById("front"));
    }
}

const card = {
    setActive(element) {

        if (!document.querySelector(".card")) return;
        
        document.querySelectorAll(".card").forEach((card) => {
            card.classList.remove("active");
        });
        element.classList.add("active");
        display.active();
        this.disableModify();
    },

    _getCard(deck) {
        let cards = [...deck.review, ...deck.cards];
        let card = cards.find((card) => (card.creationDate == document.querySelector(".card.active").id));
        return card;
    },

    modify() {
        let deck = getDeck(document.getElementById("deckList").value);
        let cardItem = card._getCard(deck);
        if (!cardItem) {
            console.error("No cards to modify");
            return
        }

        document.getElementById("searchBar").value = "";

        cardItem.front = document.getElementById("front").value.trim();
        cardItem.back = document.getElementById("back").value.trim();

        if (cardItem.front.length > 3500 || cardItem.back.length > 3500) {
            return
        }

        deck.saveDeck();
        display.cards(deck.name);
        card.setActive(document.getElementById(cardItem.creationDate));
    },

    enableModify() {
        let button = document.getElementById("modifyCard");
        button.classList.remove("inactive");
        button.disabled = false;
    },

    // Prévention des modifications si aucun changement appliqué.
    disableModify() {
        let button = document.getElementById("modifyCard");
        button.classList.add("inactive");
        button.disabled = true;
    },

    deleteCard() {
        const deck = getDeck(document.getElementById("deckList").value);
        let cardItem = card._getCard(deck);

        if (deck.cards.includes(cardItem)) {
            deck.cards.splice(deck.cards.indexOf(cardItem), 1);
            deck.saveDeck();
        } else if (deck.review.includes(cardItem)) {
            if (cardItem.status === "New") deck.newDailyCount--;
            deck.review.splice(deck.review.indexOf(cardItem), 1);
            deck.saveDeck();
        }

        document.getElementById("deleteButton").parentElement.remove();
        display.active();
    },

    // Recherche de la carte correspondante à l'entrée de l'utilisateur.
    search() {
        let input = document.getElementById("searchBar").value.trim().toLowerCase();
        const deck = getDeck(document.getElementById("deckList").value);
        const cards = [...deck.cards, ...deck.review];
        document.getElementById("noFound")?.remove();

        cards.forEach((card) => {
            let content = card.front + card.back;
            let result = content.toLowerCase().match(input);

            display.searchResults(card, result);
        })
        
        display.noMatch();
    }
}

// Limite les saisies si la limite est atteinte. 
function checkInput(event, element) {
    let lenghtLimit = 3500;
    let value = document.getElementById(element).value;

    if (value.length >= lenghtLimit && event.key !== "Backspace") {
        event.preventDefault();
        if (!document.getElementById("alert")) {
            display.characterLimit();
            card.disableModify();
        }
    } else if (value.length <= lenghtLimit && event.key === "Backspace") {
        document.getElementById("alert")?.remove();
        card.enableModify();
    } 
}


function attachEvents() {
    document.getElementById("backMenu").addEventListener("click", () => { window.location.href = links.menu });
    document.getElementById("modifyCard").addEventListener("click", card.modify);
    document.getElementById("searchBar")?.addEventListener("input", card.search)
    document.getElementById("edit")?.addEventListener("click", display.editDeckName);
    document.getElementById("deckList")?.addEventListener("change", list.getOption);
    document.getElementById("front").addEventListener("keydown", (event) => checkInput(event, "front"));
    document.getElementById("back").addEventListener("keydown", (event) => checkInput(event, "back"));
}

list.initialize();
attachEvents();