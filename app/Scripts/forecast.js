import { getDeckList } from "./storage.js"

export async function extractData() {
    let decks = getDeckList();

    fetch("/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(decks)
    })
        .then(result => {
            return result.json();
        })
}

