describe('litter auth test', () => {
  it('passes', () => {
    cy.login()

    cy.get('.justify-end > .inline-flex').contains('Post')
    cy.get('.h-16 > :nth-child(2) > .inline-flex').contains('Logout')
  })
})
