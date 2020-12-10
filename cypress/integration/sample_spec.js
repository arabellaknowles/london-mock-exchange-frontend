describe('My First Test', () => {
  it('Visits deployed webpage!', () => {
    cy.visit('http://londonmockexchange.surge.sh')
    cy.contains('Learn React').click()
  })
})
