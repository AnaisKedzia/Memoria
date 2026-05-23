describe("Révision réussie", () => {
    beforeEach(() => {
        cy.visit("http://localhost:8000/html/menu.html")
        cy.get("#storage").click()
        cy.get(".create-card-button").click()
    })

    it("Reproduit une révision réussie", () => {
        cy.contains("Culture Générale").click()
        cy.get("#answer").click()
        cy.get("#known").click()
        
        cy.visit("http://localhost:8000/html/menu.html")
        cy.get(".familiarCardCount").should("have.text", "1")
    })
})