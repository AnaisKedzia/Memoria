import { Deck } from "./deck.js";
import { Card } from "./card.js";
import { display } from "./menu.js";

const myQuestions =
    [["Quelle est la future capitale de l'Indonésie ?", "Nusantara"],
    ["Qu'est-ce qu'un poisson anadrome ?", "Poisson qui vie en mer, mais migre en eau douce pour pondre"],
    ["Quelle mer se situe entre l'Europe, le Caucase et l'Anatolie ?", "La mer noire"],
    ["Quel est le passeport le plus puissant au monde ?", "Singapour avec 195 destinations sans visa"],
    ["Qui est le nouveau président de la Corée du Sud, élu en 2025 ?", "Lee Jae-Myung"],

    ["Quel est le jeu vidéo le plus vendu au monde ?", "Minecraft "],
    ["Quels sont les quatres hormones du bonheur ?", "La dopamine, la serotonine, l'endorphine, l'ocytocine"],
    ["A partir de quel ingrédient est fabriqué le saké ?", "Du riz"],
    ["Quel personnage emblématique de Nintendo porte généralement une tunique verte et une épée ?", " Link"],
    ["Quels sont les 5 sens de l'humain ?", "La vue, l'ouïe, l'odorat, le goût, le toucher"],

    ["En quelle année se sont tenus les premiers jeux Olympiques modernes ?", "En 1896 à Athènes"],
    ["Qu'est-ce que la nomophobie ?", " La peur d'être séparé de son téléphone portable"],
    ["Quand est-ce que s'est déroulée la bataille de Waterloo ?", "Le 18 Juin 1815 "],
    ["Qui a été le président de la France de 1995 à 2007 ?", "Jacques Chirac"],
    ["Quel est l'animal terrestre le plus grand ?", "La giraffe"],

    ["Quel est la signification de DYI ?", "Do It Yourself, qui fait référence aux objets créés soi même"],
    ["Quelle ville a pour surnom Big Apple ?", "New York"],
    ["Qu'est-ce que l'échelle de Mohs ?", "Une échelle pour mesurer la dureté des minéraux"],
    ["Quel artisan fabrique ou répare les violins ?", "Le luthier"],
    ["Combien faut-il de temps à la lumière du soleil pour atteindre la terre ?", "8 minutes"]];

// Création et affichage d'un paquet par défaut.
export function createDefaultDeck() {
    const deck = new Deck("Culture Générale");

    for (let i = 0; i < myQuestions.length; i++) {
        let card = new Card(myQuestions[i][0], myQuestions[i][1]);
        card.creationDate.setMinutes(i);
        deck.cards.push(card);
    }

    deck.saveDeck()
    display.deck(deck.name);
    display.cardInfo(deck);
    document.getElementById("noDeckMessage").remove();
}



