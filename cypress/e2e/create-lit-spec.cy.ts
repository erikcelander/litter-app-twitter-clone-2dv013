describe('template spec', () => {
  it('passes', () => {
    cy.login()

    cy.wait(1500)

    cy.get('[data-cy=lit-textarea]').type('This is a test lit XXX')

    cy.get('.justify-end > .inline-flex').click({ force: true })

    cy.wait(1500)

    cy.get('.flex-col.items-center > :nth-child(1)').contains('This is a test lit XXX')
  })
})
