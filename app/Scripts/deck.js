import { getDeckList } from "./storage.js";
import { date } from "./storage.js";


export class Deck {
    constructor(name) {
        this.name = name;
        this.cards = [];
        this.review = [];
        this.dailyLimit = 5;
        this.newDailyCount = 0;
        this.resetDate = new Date().setHours(0, 0, 0);
        this.dailyReviewed = 0;
    }

    static fromJSON(data) {
        const deck = new Deck(data.name)
        Object.assign(deck, data);

        return deck;
    }

    toJSON() {
        return {
            name: this.name,
            cards: this.cards,
            review: this.review,
            dailyLimit: this.dailyLimit,
            newDailyCount: this.newDailyCount,
            resetDate: this.resetDate,
            dailyReviewed : this.dailyReviewed
        }
    }

    saveDeck() {
        const decks = getDeckList();
        decks[this.name] = this;
        localStorage.setItem("deckList", JSON.stringify(decks));
    }

    // Tri des cartes par date de révision et statut afin de construire le paquet de révision
    toReview() {
        this.resetDailyCount();

        for (let i = 0; i < this.cards.length; i++) {
            let toReview = this.checkCard(this.cards[i]);

            if (toReview) {
                this.review.push(this.cards[i]);
                this.cards.splice(i, 1);
                i--
            }
        }
        this.saveDeck();
    }

    // Vérification des conditions de la carte pour être revue. 
    checkCard(card) {
        let toReview = new Date(card.reviewDate) <= date;
        let newCard = card.status === "New";
        let countReached = this.newDailyCount >= this.dailyLimit;


        if (toReview && newCard && !countReached) {
            this.newDailyCount++;
            return true;
        } else if (toReview && !newCard) {
            return true;
        } else return false;
    }

    countNew() {
        if (this.review.length === 0) return;

        this.review.forEach((card) => {
            if (card.status === "New") this.newDailyCount++;
        })
    }

    resetDailyCount() {
        let reset = new Date(this.resetDate)

        if (reset < date) {
            this.newDailyCount = 0;
            this.dailyReviewed = 0;
            this.resetDate = reset.setDate(reset.getDate() + 1);
            this.countNew();
        }
    }

    increaseDailyLimit() {
        this.dailyLimit++;
        this.toReview();
    }

    decreaseDailyLimit() {
        if (this.dailyLimit !== 0) {
            this.dailyLimit--;
            let newCard = this.review.findIndex((card) => (card.status === "New"));

            if (this.review.length !== 0 && newCard !== -1) {
                this.newDailyCount--;
                let card = this.review.splice(newCard, 1);
                this.cards.push(card[0]);
            }
            this.saveDeck();
        }
    }
}



