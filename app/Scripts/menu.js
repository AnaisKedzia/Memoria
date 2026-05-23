import { Deck } from "./deck.js"
import { getDeck, getDeckList, links, date } from "./storage.js";
import { createDefaultDeck } from "./default-deck.js";
import { lang } from "./lang.js";
import { reviewDate } from "./debug-tools.js";
import { extractData } from "./forecast.js"

//Contrôle de la liste de paquets et modification de ses éléments.
const decks = {
    get deckList() {
        return getDeckList()
    },

    get emptyList() {
        return Object.keys(this.deckList).length === 0;
    },

    // Chargement de la liste de paquets de l'utilisateur et affichage.
    checkDecks() {
        if (decks.emptyList) {
            display.noDeck();
        }
        else {
            let deckNames = Object.keys(this.deckList);
            deckNames.forEach(deck => {
                display.deck(deck);
                display.cardInfo(getDeck(deck));
            });
        }
    },

    createDeck() {
        const userInput = document.getElementById("inputBar").value.trim();

        if (this._validDeckName(userInput)) {
            let deck = new Deck(userInput);
            deck.saveDeck();
            display.deck(deck.name);
            display.cardInfo(deck)

            if (!this.emptyList) {
                document.getElementById("noDeckMessage").remove();
            }

            document.getElementById("inputBar").value = "";
        }
    },

    _validDeckName(name) {
        let alerts = lang.translate("alerts");
        if (name in this.deckList) {
            document.getElementById("alerts").innerText = `${alerts["deck-duplicates"]}`;
            return false;
        } else if (name == "") {
            document.getElementById("alerts").innerText = `${alerts["empty-deck"]}`;
            return false;
        } else if (name.length > 30) {
            document.getElementById("alerts").innerText = `${alerts["limit-reached"]}`;
            return false;
        } else return true;
    },

    increaseDailyLimit(name) {
        const deck = getDeck(name);
        deck.increaseDailyLimit();
        display.cardInfo(deck);
    },

    decreaseDailyLimit(name) {
        const deck = getDeck(name);
        deck.decreaseDailyLimit();
        display.cardInfo(deck);
    },
}

// Affichage de la page.
export const display = {
    deck(name) {
        const deck = this.create.deckElements(name);
        let deckNav = document.getElementById("deck-display");

        deckNav.appendChild(deck);
    },

    //Affichage des informations relatives aux cartes du paquet (cartes nouvelles, familières).
    cardInfo(deck) {
        deck.toReview();
        let newCount = 0;
        let familiarCount = 0;

        deck.review.forEach((card) => {
            if (card.status === "New") {
                newCount++;
            } else familiarCount++;
        })

        document.getElementById("count" + deck.name).innerHTML = `${deck.dailyLimit}`;
        document.getElementById("newInfo" + deck.name).innerHTML = `${newCount}`;
        document.getElementById("familiarInfo" + deck.name).innerHTML = `${familiarCount}`;
    },


    inputBar() {
        if (document.getElementById("inputBar")) {
            document.getElementById("inputBar").remove();
            document.getElementById("addDeckButton").remove();
            return
        }

        let nav = document.getElementById("menu");
        const [inputBar, button, alert] = this.create.inputBarElements();

        nav.appendChild(alert);
        nav.appendChild(inputBar);
        nav.appendChild(button);

    },

    noDeck() {
        const noDeck = this.create.noDeckMessage();
        let nav = document.getElementById("deck-display");

        nav.appendChild(noDeck);
    },

    create: {
        inputBarElements() {
            let inputBar = document.createElement("input");
            inputBar.type = "text";
            inputBar.id = "inputBar"
            inputBar.placeholder = lang.translate("deck-name") || "Deck name";
            inputBar.setAttribute("data-i18n", "")
            inputBar.setAttribute("data-i18n-attr", "placeholder:deck-name")
            inputBar.className = "input-bar";
            inputBar.addEventListener("keydown", (key) => {
                if (key.code === "Enter") decks.createDeck();
            });
            inputBar.addEventListener("input", () => {
                if (document.getElementById("alerts").innerText !== "")
                    document.getElementById("alerts").innerText = "";
            });

            let button = document.createElement("button");
            button.innerText = "+";
            button.className = "add-input";
            button.id = "addDeckButton";
            button.onclick = () => decks.createDeck();

            let alert = document.createElement("p");
            alert.id = "alerts";

            return [inputBar, button, alert]
        },

        deckElements(name) {
            let deckDiv = document.createElement("div");
            deckDiv.className = "deck";
            deckDiv.id = "deck" + name;

            let deckTop = document.createElement("div");
            deckTop.className = "deckTop";

            let deckCenter = document.createElement("div");
            deckCenter.className = "deckCenter";

            let deckBottom = document.createElement("div");
            deckBottom.className = "deckBottom"; 

            let deleteDeck = document.createElement("button");
            deleteDeck.innerHTML = "X";
            deleteDeck.className = "delete-button";
            deleteDeck.addEventListener("click", () => display.eraseDeck(name));

            let decreaseCount = document.createElement("button")
            decreaseCount.className = "deck-button-minus";
            decreaseCount.innerHTML = "-";
            decreaseCount.id = "decreaseCount" + name;
            decreaseCount.addEventListener("click", () => decks.decreaseDailyLimit(name));

            let deckInformationNewCards = document.createElement("p");
            deckInformationNewCards.setAttribute("data-i18n", "daily-counter")
            deckInformationNewCards.className = "count";
            deckInformationNewCards.innerHTML = `${lang.translate("daily-counter")}`

            let newCardLimit = document.createElement("p");
            newCardLimit.id = "count" + name;
            newCardLimit.className = "count";

            let deckName = document.createElement("h3");
            deckName.innerHTML = name;
            deckName.addEventListener("click", () => {
                links.review(name);
            });

            let addCards = document.createElement("button");
            addCards.className = "create-card-button";
            addCards.innerHTML = `${lang.translate("second-step")}`;
            addCards.id = "createCards";
            addCards.setAttribute("data-i18n", "second-step")
            addCards.addEventListener("click", () => links.createCard(name));

            let newCardDiv = document.createElement("div");

            let increaseCount = document.createElement("button")
            increaseCount.className = "deck-button-plus";
            increaseCount.innerHTML = "+";
            increaseCount.id = "increaseCount" + name;
            increaseCount.addEventListener("click", () => decks.increaseDailyLimit(name));

            let newInfo = document.createElement("p");
            newInfo.setAttribute("data-i18n", "new-cards")
            newInfo.innerHTML = `${lang.translate("new-cards")}`;
            newInfo.className = "deck-counter";

            let newCardCounter = document.createElement("p");
            newCardCounter.id = "newInfo" + name;

            let familiarCardDiv = document.createElement("div");

            let familiarInfo = document.createElement("p");
            familiarInfo.setAttribute("data-i18n", "familiar-cards")
            familiarInfo.innerHTML = `${lang.translate("familiar-cards")}`;
            familiarInfo.className = "familiarInfo" + name;

            let familiarCardCounter = document.createElement("p");
            familiarCardCounter.id = "familiarInfo" + name;
            familiarCardCounter.className = "familiarCardCount";

            deckTop.appendChild(deckInformationNewCards);
            deckTop.appendChild(newCardLimit);
            deckTop.appendChild(decreaseCount);
            deckTop.appendChild(increaseCount);
            deckTop.appendChild(deleteDeck);

            deckCenter.appendChild(deckName);
            deckCenter.appendChild(addCards);

            deckBottom.appendChild(newCardDiv);
            deckBottom.appendChild(familiarCardDiv);
            newCardDiv.appendChild(newInfo);
            newCardDiv.appendChild(newCardCounter);
            familiarCardDiv.appendChild(familiarInfo);
            familiarCardDiv.appendChild(familiarCardCounter);

            deckDiv.appendChild(deckTop);
            deckDiv.appendChild(deckCenter);
            deckDiv.appendChild(deckBottom)

            return deckDiv;
        },

        noDeckMessage() {
            let display = document.createElement("div");
            display.className = "deck";
            display.id = "noDeckMessage";

            let deckCenter = document.createElement("div");
            deckCenter.className = "deckCenter";

            let title = document.createElement("h3");
            title.innerHTML = `${lang.translate("no-deck")}`;
            title.setAttribute("data-i18n", "no-deck")

            let message = document.createElement("p");
            message.setAttribute("data-i18n", "default-deck-message")
            message.innerHTML = `${lang.translate("default-deck-message")}`;
            message.style.padding = "20px";

            let button = document.createElement("button");
            button.innerHTML = `${lang.translate("create-deck")}`;
            button.setAttribute("data-i18n", "create-deck")
            button.className = "create-card-button";
            button.addEventListener("click", createDefaultDeck)

            deckCenter.appendChild(title);
            deckCenter.appendChild(message);
            deckCenter.appendChild(button);
            display.appendChild(deckCenter);

            return display
        }
    },


    // Suppression du paquet et ses données relatives.
    eraseDeck(deckName) {
        document.getElementById("deck" + deckName).remove();
        let deckList = decks.deckList;
        delete deckList[deckName];

        if (Object.keys(deckList).length === 0) {
            display.noDeck();
        }

        localStorage.setItem("deckList", JSON.stringify(deckList));
    },
}

function attachEvents() {
    document.getElementById("createDeckMenu").addEventListener("click", () => display.inputBar());
    document.getElementById("checkReview").addEventListener("click", () => { 
        extractData()
        .then(() => window.location.href = links.checkReview)
         });
    document.getElementById("manageCards").addEventListener("click", () => { window.location.href = links.manageCards; });
    document.getElementById("storage").addEventListener("click", () => {
        localStorage.clear();
        window.location.reload();
    });
    document.getElementById("intro").addEventListener("click", () =>  window.location.href = links.index)
}

decks.checkDecks();
reviewDate.displayDate(date);
attachEvents();