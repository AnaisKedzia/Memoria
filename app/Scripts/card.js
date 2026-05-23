import { date } from "./storage.js";

export class Card {
    constructor(front, back) {
        this.front = front;
        this.back = back;
        this.creationDate = new Date()
        this.reviewDate = new Date()
        this.status = "New";
        this.accumulator = 1;
    }

    static fromJSON(data) {
        let card = new Card(data.front, data.back);
        Object.assign(card, data);

        return card
    }

    // Augmententation de l'intervalle de temps entre les révisions après une réussite.
    increaseReviewInterval() {
        const day = new Date();
        day.setDate(date.getDate() + this.accumulator);
        this.accumulator *= 2;
        this.reviewDate = day;
    }

    // Diminuation de l'intervalle de temps entre les révisions après un échec.
    decreaseReviewInterval() {
        if (this.accumulator > 1) this.accumulator /= 2;
    }
}