import { getDeck, clickedDeck, links } from "./storage.js";
import { lang } from "./lang.js";

function showQuestion() {
    let content = document.getElementById("card")

    if (deck.review.length === 0) {
        document.getElementById("answer").remove();
        document.getElementById("card").innerHTML = `${lang.translate("review-finished")}`;
        document.getElementById("card").setAttribute("data-i18n", "review-finished");
    }
    else {
        const card = deck.review[0];
        content.innerHTML = card.front;
        window.addEventListener("keydown", reviewShortcuts)
    }
}

function showAnswer() {
    const card = deck.review[0];
    if (document.getElementById("card").innerHTML == card.front) {
        document.getElementById("card").innerHTML = card.back;
        displayButtons();
    }
}

function createAnswerButton() {
    let answer = document.createElement("button");
    answer.className = "default-button";
    answer.innerHTML = `${lang.translate("show-answer")}`
    answer.id = "answer";
    answer.addEventListener("click", showAnswer)

    return answer;
}

function createReviewButtons() {
    let known = document.createElement("button");
    known.className = "default-button";
    known.setAttribute("data-i18n", "known-card")
    known.innerHTML = `${lang.translate("known-card")}`
    known.id = "known";
    known.addEventListener("click", knownAnswer);

    let unknown = document.createElement("button");
    unknown.className = "default-button";
    unknown.innerHTML = `${lang.translate("unknown-card")}`
    unknown.setAttribute("data-i18n", "unknown-card")
    unknown.id = "unknown";
    unknown.addEventListener("click", unknownAnswser);

    return [known, unknown];
}

function displayButtons() {
    let answerButton = document.getElementById("answer");

    if (answerButton) {
        let [known, unknown] = createReviewButtons();
        let cardDisplayMenu = document.getElementById("cardDisplayMenu");
        let cardDisplay = document.getElementById("cardDisplay");

        cardDisplayMenu.insertBefore(unknown, cardDisplay);
        cardDisplayMenu.appendChild(known);

        answerButton.remove();
    } else {
        let parentNode = document.getElementById("reviewWindow");
        let button = createAnswerButton();

        document.getElementById("unknown").remove();
        document.getElementById("known").remove();

        parentNode.appendChild(button);
    }
}

// Ajout de la carte dans le paquet de révision si elle est nouvelle pour une seconde itération.
// Ajuste la date de la carte si elle est familière et la retire du paquet de révision.
function knownAnswer() {
    const card = deck.review[0];

    if (card.status === "New") {
        card.status = "Familiar";
        deck.dailyReviewed++;
        const review = deck.review.shift();
        deck.review.push(review);
    } else {
        const review = deck.review.shift();
        review.increaseReviewInterval();
        deck.cards.push(review);
    }

    deck.saveDeck();
    if (deck.review.length === 0) {
        finishReview();
        return
    }
    showQuestion();
    displayButtons();
}

// Réduit l'intervalle de temps entre deux révisions.
function unknownAnswser() {
    const card = deck.review.shift();

    if (card.status === "New") {
        deck.review.push(card);
    } else {
        card.decreaseReviewInterval();
        deck.review.push(card);
    }
    deck.saveDeck();
    showQuestion();
    displayButtons();
}

function finishReview() {
    document.getElementById("card").innerHTML = `${lang.translate("review-finished")}`;
    document.getElementById("card").setAttribute("data-i18n", "review-finished");
    document.getElementById("unknown").remove();
    document.getElementById("known").remove();
    window.removeEventListener("keydown", reviewShortcuts)
}

// Entrée : Affiche la réponse.
// Flèche droite : Réponse connue.
// Flèche droite : Carte à revoir.
function reviewShortcuts(event) {
    let backDisplayed = document.getElementById("known");

    switch (event.key) {
        case " ":
            showAnswer();
            break;
        case "ArrowRight":
            if (backDisplayed) knownAnswer();
            break;
        case "ArrowLeft":
            if (backDisplayed) unknownAnswser();
            break;
    }
}

function attachEvents() {
    document.getElementById("clickedDeck").innerHTML = clickedDeck;
    document.getElementById("backMenu").addEventListener("click", () => window.location.href = links.menu);
    if (document.getElementById("answer")) {
        document.getElementById("answer").addEventListener("click", showAnswer);
    }  
}

const deck = getDeck(clickedDeck);
deck.toReview();

showQuestion();
attachEvents();
