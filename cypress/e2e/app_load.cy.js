// Teste le chargement de l'application

describe("Lancement de l'application", () => {
    it("Charge la page d'accueil", () => {
        cy.visit("http://localhost:8000")
        cy.contains("flashcard" || "flashcards" ||"플래시카드" )
    })
})