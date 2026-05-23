

describe("Créer une carte valide", () => {
    beforeEach(() => {
        cy.visit("http://localhost:8000/html/menu.html")
        cy.get("#storage").click()
        cy.get(".create-card-button").click()
    })

    it("Crée une carte valide", () => {
        cy.get(".create-card-button").click()

        cy.get("#front").type("Test front")
        cy.get("#back").type("Test back")
        cy.get("#addCard").click()
        cy.get(".validation-message").should("exist")
        cy.get(".validation-message").should("not.exist")
        
    })
})