import { date } from "./storage.js";

// Ce module fournit des outils validant le comportement de l'application durant son développement.
// Non inclu dans la version finale.


// Affichage et manipulation de la date du jour/ date de révision. 
export const reviewDate = {
    displayDate(date) {
        document.getElementById("date").innerHTML = `${date.toLocaleDateString()}`;

        let today = new Date();
        let decreaseReviewDateButton = document.getElementById("decreaseDate");
        if (today.setHours(23, 59) < date && !decreaseReviewDateButton) {
            reviewDate.decreaseReviewButton();
        }
    },

    createDateElements() {
        let reviewDate = document.createElement("p");
        reviewDate.className = "date";
        reviewDate.setAttribute("data-i18n", "review-date");

        let dateDisplay = document.createElement("p");
        dateDisplay.className = "date";
        dateDisplay.id = "date";
        dateDisplay.style.padding = "10px";

        let increaseButton = document.createElement("button");
        increaseButton.id = "increaseDate";
        increaseButton.className = "date-button";
        increaseButton.textContent = "+";

        let div = document.getElementById("dateMenu");
        
        div.appendChild(reviewDate);
        div.appendChild(dateDisplay)
        div.appendChild(increaseButton);
        },

    increaseReviewDate() {
        let today = new Date();
        date.setDate(date.getDate() + 1);
        localStorage.setItem("date", JSON.stringify(date));
        document.getElementById("date").innerHTML = `${date.toLocaleDateString()}`;


        let decreaseReviewDateButton = document.getElementById("decreaseDate");
        if (today.setHours((23, 59)) !== date && !decreaseReviewDateButton) {
            reviewDate.decreaseReviewButton();
        }
        window.location.reload();
    },

    decreaseReviewDate() {
        let today = new Date();

        if (today.setHours(23, 59) < date) {
            date.setDate(date.getDate() - 1);
            localStorage.setItem("date", JSON.stringify(date));
            document.getElementById("date").innerHTML = `${date.toLocaleDateString()}`;
        }
        if (today.setHours(23, 59) === date) {
            document.getElementById("decreaseDate").remove();
        }
        window.location.reload();
    },

    decreaseReviewButton() {
        let increaseReviewDateButton = document.getElementById("increaseDate");
        let button = document.createElement("button");
        button.id = "decreaseDate";
        button.className = "date-button";
        button.innerHTML = "-";
        button.addEventListener("click", reviewDate.decreaseReviewDate);

        document.getElementById("dateMenu").insertBefore(button, increaseReviewDateButton);
    }

}

reviewDate.createDateElements();
document.getElementById("increaseDate").addEventListener("click", () => reviewDate.increaseReviewDate());