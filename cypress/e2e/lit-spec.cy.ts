describe('lit spec', () => {
  it('passes', () => {
    cy.visit(Cypress.env('prod_url') + '/lit/27904c65-abf5-466d-974a-e371bd3a30bc')

    cy.get('.min-w-xl > .flex-col').contains('cats')

    cy.get('.ml-5.flex-row').contains('@ek223ur')
  })
})
