describe('searchBar.js', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('search bar loads correct posts', () => {
    cy.get('.header_toggle-btn-container > button').click();
    cy.wait(2000); 
    cy.get('input[name="search"]').type('the');
    cy.get('.post_main-content-container > .post_title-bottom-details-img-container > .post_title-bottom-details-container > .post_title-container > .post_title').first().contains(/the/i);
  });

  it('renders the no posts page when no equivalent posts are returned from search', () => {
    cy.get('.header_toggle-btn-container > button').click();
    // cy.get('input[name="search"]').clear();
    cy.get('input[name="search"]').type('zxcvbnmaqwert');
    cy.get('.post_no-posts > h1').should('exist');
  });

  it('routes back to the previous route page pre search when search bar is cleared - all route pages tested', () => {
    // popular
    cy.get('.header_toggle-btn-container > button').click();
    cy.get('input[name="search"]').type('the');
    cy.get('input[name="search"]').clear();
    cy.get('.popular-post').its('length').should('eq', 10);
    // sport
    cy.get('[href="/sport"] > .nav_link-text').click();
    cy.get('.header_toggle-btn-container > button').click();
    cy.get('input[name="search"]').type('the');
    cy.get('input[name="search"]').clear();
    cy.url().should('include', 'sport');
    cy.get('.sport-post').its('length').should('eq', 10);
    // mews
    cy.get('[href="/news"] > .nav_link-text').click();
    cy.get('.header_toggle-btn-container > button').click();
    cy.get('input[name="search"]').type('the');
    cy.get('input[name="search"]').clear();
    cy.url().should('include', 'news');
    cy.get('.news-post').its('length').should('eq', 10);
  });

  it('whilst in searchMode, page routes to the nav specific posts on each nav link click', () => {
    // sport
    cy.get('.header_toggle-btn-container > button').click();
    cy.get('input[name="search"]').type('the');
    cy.get('[href="/sport"] > .nav_link-text').click();
    cy.url().should('include', 'sport');
    cy.get('.sport-post').its('length').should('eq', 10);
    cy.get('#sideNav').should('not.have.class', 'sideNav_show-nav');
    // news 
    cy.get('.header_toggle-btn-container > button').click();
    cy.get('input[name="search"]').type('the');
    cy.get('[href="/news"] > .nav_link-text').click();
    cy.url().should('include', 'news');
    cy.get('.news-post').its('length').should('eq', 10);
    cy.get('#sideNav').should('not.have.class', 'sideNav_show-nav');
    // popular 
    cy.get('.header_toggle-btn-container > button').click();
    cy.get('input[name="search"]').type('the');
    cy.get('[href="/"] > .nav_link-text').click();
    cy.get('.popular-post').its('length').should('eq', 10);
    cy.get('#sideNav').should('not.have.class', 'sideNav_show-nav');
  });
});