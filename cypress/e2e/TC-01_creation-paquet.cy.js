describe("Création d'un paquet valide", () => {
    beforeEach(() => {
        cy.visit("http://localhost:8000/html/menu.html")
    })

    it("Créer un paquet valide", () => {
        cy.get("#createDeckMenu").click()
        cy.get("#inputBar").type("TEST")
        cy.get("#addDeckButton").click()

        cy.contains("TEST").should("exist")
    })
})