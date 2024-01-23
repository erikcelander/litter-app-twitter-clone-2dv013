describe('litter auth test', () => {
    it('passes', () => {
      cy.loginStaging()

      cy.get('form > .inline-flex').contains("Logout")

      cy.get('.space-y-2 > .font-medium').contains("What's happening?")
      cy.get('.justify-end > .inline-flex').contains('Post')
      
    })
  })