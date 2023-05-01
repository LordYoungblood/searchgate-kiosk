describe('template spec', () => {
  it('adds vehicle', () => {
    cy.login('avery', 'password')

    cy.get('#firstName').type('John');
    cy.get('#lastName').type('Doe');
    cy.get('#state').type('click');
    
    cy.wait(1000)
    cy.contains('Alabama').click()
    cy.get('#dl').type('1234567890');
    cy.get('#plate').type('ABC123');
    cy.get('#make').type('car');
    cy.get('#model').type('car');

    cy.contains('Print').click();
    cy.get('#print-modal').should('be.visible');
  })
})