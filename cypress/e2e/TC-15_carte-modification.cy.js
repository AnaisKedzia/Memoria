describe("Modification d'une carte", () => {
    beforeEach(() => {
        cy.visit("http://localhost:8000/html/menu.html")
        cy.get("#storage").click()
        cy.get(".create-card-button").click()
    })

    it("Modifie une carte existante", () => {
        cy.get("#manageCards").click()
        cy.get("#front").type("{backspace}".repeat(5))

        cy.get("#modifyCard").click()
        cy.get("#modifyCard").should("be.disabled")

        cy.get("#front").invoke("val").as("newValue")

        cy.reload()

        cy.get("@newValue").then((newValue) => {
            cy.get("#front").invoke("val").should("eq", newValue)
        })
    })
})