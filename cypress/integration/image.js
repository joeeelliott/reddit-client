describe('image.js', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders images dependant on viewport size', () => {
    // tablet 
    cy.viewport(768, 975);
    cy.get('.post_img-container').should('be.visible'); 
    // tablet length, small height
    cy.viewport(768, 300);
    cy.get('.post_img-container').should('be.visible');
    // just below tablet 
    cy.viewport(767, 975);
    cy.get('.post_img-container').should('not.be.visible'); 
    // just below tablet, smaller height
    cy.viewport(767, 300);
    cy.get('.post_img-container').should('not.be.visible'); 
  });

  it('image modals work correctly on click', () => {
    cy.viewport(768, 975);
    cy.get('.post_img-modal').should('not.exist');
    cy.get('.post_img-container').first().click(); 
    cy.get('.post_img-modal').should('be.visible').then(($img) => {
      cy.get('.post_img-container').eq(1).click(); 
      cy.get('.post_img-modal').should('be.visible');

      cy.get($img).should('not.exist'); 
    });
  });
});