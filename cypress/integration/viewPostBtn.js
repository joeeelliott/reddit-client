describe('viewPostBtn.js', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('button renders', () => {
    cy.get('.post_link-btn-text').first().should('exist');
  });

  it('modal appears onclick', () => {
    cy.get('.post_link-btn-text').first().click();
    cy.get('.post_link-modal-container').should('be.visible');    
  });

  it('modal buttons remove modal', () => {
    cy.get('.post_link-btn-text').first().click();
    cy.get('.post_link-modal-container').first().should('be.visible');    
    cy.findAllByText('NO').first().click();
    cy.get('.post_link-modal-container').should('not.exist');

    cy.get('.post_link-btn-text').first().click();
    cy.get('.post_link-modal-container').first().should('be.visible');    
    cy.get('.post_permalink').first().click();
    cy.get('.post_link-modal-container').should('not.exist'); 
  });
});