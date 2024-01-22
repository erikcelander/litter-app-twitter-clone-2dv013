describe('litter auth test', () => {
    it('passes', () => {
      cy.visit(Cypress.env('staging_url') + Cypress.env('login_path'))
      
      cy.get('.animate-in > .inline-flex').click()

      cy.wait(3000)

      cy.get('form > .inline-flex').contains("Logout")

      cy.get('.space-y-2 > .font-medium').contains("What's happening?")
      cy.get('.justify-end > .inline-flex').contains('Post')
    })
  })