describe('app.js', () => {
  beforeEach(() => {
    cy.visit('/');
  })

  it('renders the App', () => {
    cy.get('.App').should('exist'); 
  });

  it('popular posts are loaded on initial render', () => {
    cy.wait(2000);
    cy.get('.popular-post').should('exist');
  });

  it('routes to the sport page and renders posts', () => {
    cy.findByText('Sport').should('exist');
    cy.findByText('Sport').click();
    cy.url().should('include', 'sport');
    cy.wait(2000);
    cy.get('.sport-post').should('exist');
  });

  it('routes to the news page and renders posts', () => {
    cy.findByText('News').should('exist');
    cy.findByText('News').click();
    cy.url().should('include', 'news');
    cy.wait(2000);
    cy.get('.news-post').should('exist');
  });

  it('logo and header route back to the homepage', () => {
    cy.findByText('News').click();
    cy.url().should('include', 'news');
    cy.get('.header_title').click();
    cy.wait(2000);
    cy.get('.popular-post').should('exist');
  });
});