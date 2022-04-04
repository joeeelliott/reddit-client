import '@testing-library/cypress/add-commands';

describe('renders the homepage', () => {

  beforeEach(() => {
    cy.visit('/');
  })
  it('renders correctly', () => {
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

  // UPTO, have a play on my app to see what other things i can test
  // carry on watching videos to see what else i can test and also and what other methods there are of firing events, grabbing stuff etc. 
  // might need to get rid of undefined cy when i eventually push and merge 
});