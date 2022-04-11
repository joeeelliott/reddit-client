describe('sideNav.js', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  // it('sideNav opens and closes', () => {
  //   cy.get('#sideNav').should('not.have.class', 'sideNav_show-nav');
  //   cy.get('.header_toggle-btn-container > button').click();
  //   cy.get('#sideNav').should('have.class', 'sideNav_show-nav');
  //   cy.get('.header_toggle-btn-container > button').click();
  //   cy.get('#sideNav').should('not.have.class', 'sideNav_show-nav');    
  // });

  // it('sidenav closes when user clicks anywhere outside of sidenav', () => {
  //   cy.get('.header_toggle-btn-container > button').click();
  //   cy.get('#sideNav').should('have.class', 'sideNav_show-nav');
  //   cy.get('.post_outer-container').first().click(); 
  //   cy.get('#sideNav').should('not.have.class', 'sideNav_show-nav');
  // });  

  it('eye icon restores all hidden posts to the timeline', () => {
    cy.get('.post_title').first().then(($title => {
      const txt = $title.text();

      cy.get('.post_ellipsis-container > [type="button"] > .svg-inline--fa > path').first().click();
      cy.get('.post_hide-text').first().click();

      cy.get('.post_title').eq(1).then(($title2) => {
        const txt2 = $title2.text();

        cy.get('.post_ellipsis-container > [type="button"] > .svg-inline--fa > path').eq(1).click();
        cy.get('.post_hide-text').eq(1).click();

        cy.get('.header_toggle-btn-container > button').click();

        // play test, get to opening sidenav, need to click the eye then ensure the title variables match the equivalent posts back in '/' page. 

        // then maybe do it over two different route pages a post from each -- or maybe do this anyway
      })
    }))
  }); 
});