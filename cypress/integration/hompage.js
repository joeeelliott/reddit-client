describe('homepage', () => {

  beforeEach(() => {
    cy.visit('/');
  })

  // it('renders the App correctly', () => {
  //   cy.get('.App').should('exist'); 
  // });

  // it('popular posts are loaded on initial render', () => {
  //   cy.wait(2000);
  //   cy.get('.popular-post').should('exist');
  // });

  // it('routes to the sport page and renders posts', () => {
  //   cy.findByText('Sport').should('exist');
  //   cy.findByText('Sport').click();
  //   cy.url().should('include', 'sport');
  //   cy.wait(2000);
  //   cy.get('.sport-post').should('exist');
  // });

  // it('routes to the news page and renders posts', () => {
  //   cy.findByText('News').should('exist');
  //   cy.findByText('News').click();
  //   cy.url().should('include', 'news');
  //   cy.wait(2000);
  //   cy.get('.news-post').should('exist');
  // });

  // it('logo and header route back to the homepage', () => {
  //   cy.findByText('News').click();
  //   cy.url().should('include', 'news');
  //   cy.get('.header_title').click();
  //   cy.wait(2000);
  //   cy.get('.popular-post').should('exist');
  // });

  // it('sideNav opens and closes', () => {
  //   cy.get('#sideNav').should('not.have.class', 'sideNav_show-nav');
  //   cy.get('.header_toggle-btn-container > button').click();
  //   cy.get('#sideNav').should('have.class', 'sideNav_show-nav');
  //   cy.get('.header_toggle-btn-container > button').click();
  //   cy.get('#sideNav').should('not.have.class', 'sideNav_show-nav');

  //   // whilst open, if user clicks outside of sideNav, it closes 
  //   cy.get('.header_toggle-btn-container > button').click();
  //   cy.get('#sideNav').should('have.class', 'sideNav_show-nav');
  //   cy.get('.post_outer-container').first().click(); 
  //   cy.get('#sideNav').should('not.have.class', 'sideNav_show-nav');
  // });

  // it('search bar loads correct posts and returns/routes to specified posts correctly', () => {
  //   // search bar loads posts
  //   cy.get('.header_toggle-btn-container > button').click();
  //   cy.wait(2000); 
  //   cy.get('input[name="search"]').type('the');
  //   cy.get('.post_main-content-container > .post_title-bottom-details-img-container > .post_title-bottom-details-container > .post_title-container > .post_title').first().contains(/the/i);

  //   // no posts page renders when no equivalent post
  //   cy.get('input[name="search"]').clear();
  //   cy.get('input[name="search"]').type('zxcvbnmaqwert');
  //   cy.get('.post_no-posts > h1').should('exist');
    
  //   // routes back to previous route page pre search once search is cleared. popular from initial render, then click sports, search and test back to sport
  //   cy.get('input[name="search"]').clear();
  //   cy.get('.popular-post').its('length').should('eq', 10);

  //   cy.get('[href="/sport"] > .nav_link-text').click();
  //   cy.get('.header_toggle-btn-container > button').click();
  //   cy.get('input[name="search"]').type('the');
  //   cy.get('input[name="search"]').clear();
  //   cy.url().should('include', 'sport');
  //   cy.get('.sport-post').its('length').should('eq', 10);

  //   // whilst in searchMode, page routes to the nav specific posts on each nav link click
  //   cy.get('input[name="search"]').type('the');
  //   cy.get('[href="/sport"] > .nav_link-text').click();
  //   cy.url().should('include', 'sport');
  //   cy.get('.sport-post').its('length').should('eq', 10);
  //   cy.get('#sideNav').should('not.have.class', 'sideNav_show-nav');

  //   cy.get('.header_toggle-btn-container > button').click();
  //   cy.get('input[name="search"]').type('the');
  //   cy.get('[href="/news"] > .nav_link-text').click();
  //   cy.url().should('include', 'news');
  //   cy.get('.news-post').its('length').should('eq', 10);
  //   cy.get('#sideNav').should('not.have.class', 'sideNav_show-nav');

  //   cy.get('.header_toggle-btn-container > button').click();
  //   cy.get('input[name="search"]').type('the');
  //   cy.get('[href="/"] > .nav_link-text').click();
  //   cy.get('.popular-post').its('length').should('eq', 10);
  //   cy.get('#sideNav').should('not.have.class', 'sideNav_show-nav');
  // });
  
  it('loads the correct number of posts next to the post filters', () => {
    cy.wait(3000);
    cy.get(':nth-child(5) > label').then(($number) => {
      const txt = $number.text();
      expect(txt).to.eq('All (30)');
    });
    cy.get(':nth-child(6) > label').then(($number) => {
      const txt = $number.text();
      expect(txt).to.eq('Popular (10)');
    });
    cy.get(':nth-child(7) > label').then(($number) => {
      const txt = $number.text();
      expect(txt).to.eq('Sport (10)');
    });
    cy.get(':nth-child(8) > label').then(($number) => {
      const txt = $number.text();
      expect(txt).to.eq('News (10)');
    });
    cy.get(':nth-child(9) > label').then(($number) => {
      const txt = $number.text();
      expect(txt).to.eq('Saved (0)');
    });
    cy.get(':nth-child(10) > label').then(($number) => {
      const txt = $number.text();
      expect(txt).to.eq('Hidden (0)');
    });
    cy.get(':nth-child(11) > label').then(($number) => {
      const txt = $number.text();
      expect(txt).to.eq('Reported (0)');
    });

    
  });

  // continue with filters tests
});