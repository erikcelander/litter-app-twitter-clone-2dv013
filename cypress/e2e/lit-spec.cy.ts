describe('lit spec', () => {
  it('passes', () => {
    //cy.visit(Cypress.env('dev_url') + '/lit/5d090920-f9c0-4aec-a6d0-92ce4bf9928a')
    cy.visit(Cypress.env('staging_url') + '/lit/f38d4c36-eee5-4ddd-ae83-9dc29c47bc4d')
    
    
    cy.get('.w-56 > .text-sm').contains('Lorem ipsum dolor sit amet, consectetur')
    cy.get('.grid > .font-medium').contains('Erik Kroon Celander')
    cy.get('.text-gray-500').contains('ek223ur')
  })
})