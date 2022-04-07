describe('sideNav.js', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('sideNav opens and closes', () => {
    cy.get('#sideNav').should('not.have.class', 'sideNav_show-nav');
    cy.get('.header_toggle-btn-container > button').click();
    cy.get('#sideNav').should('have.class', 'sideNav_show-nav');
    cy.get('.header_toggle-btn-container > button').click();
    cy.get('#sideNav').should('not.have.class', 'sideNav_show-nav');    
  });

  it('sidenav closes when user clicks anywhere outside of sidenav', () => {
    cy.get('.header_toggle-btn-container > button').click();
    cy.get('#sideNav').should('have.class', 'sideNav_show-nav');
    cy.get('.post_outer-container').first().click(); 
    cy.get('#sideNav').should('not.have.class', 'sideNav_show-nav');
  });  
});