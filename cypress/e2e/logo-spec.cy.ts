describe('litter logo text test', () => {
  it('passes', () => {
    cy.visit('https://qa-cscloud7-103.lnu.se')
    cy.get('.flex > .text-center').contains('litter')
  })
})