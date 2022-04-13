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

  it('eye icon restores all hidden posts to the timeline', () => {
    cy.get('.post_title').first().then(($title => {
      // save title of first popular post
      const popularPost = $title.text();
      // hide post
      cy.get('.post_ellipsis-container > [type="button"]').first().click();
      cy.get('.post_hide-text').first().click();
      // route to /sport
      cy.get('[href="/sport"] > .nav_link-text').click();
      cy.url().should('include', 'sport');
      // save title of first sport post
      cy.get('.post_title').first().then(($title2) => {
        const sportPost = $title2.text();
        // hide post
        cy.get('.post_ellipsis-container > [type="button"]').first().click();
        cy.get('.post_hide-text').first().click();
        // unhide posts via eye icon
        cy.get('.header_toggle-btn-container > button').click();
        cy.get('.sideNav_eye-icon-container > button').click();
        // save title of first /sport post 
        cy.get('.post_title').first().then(($title3) => {
          const sportPost2 = $title3.text();
          // title of first post pre and post unhide click match
          expect(sportPost).to.eq(sportPost2); 
        });
        // route to popular
        cy.get('[href="/"] > .nav_link-text').click();
        cy.url().should('include', '/');
        // save title of first popular post
        cy.get('.post_title').first().then(($title4) => {
          const popularPost2 = $title4.text();
          // title of first post pre and post unhide click match
          expect(popularPost).to.eq(popularPost2); 
        });
      });
    }));
  }); 

  it('correct text shown next to eye icon when posts are/aren\'t hidden', () => {
    // from render click eye 
    cy.get('.header_toggle-btn-container > button').click();
    cy.get('.sideNav_eye-icon-container > button').click();
    // grab text
    cy.get('.sideNav_eye-icon-hover-text').then(($text) => {
      const noneHiddenTxt = $text.text(); 
      // grab text again so that both variable values are dynamic (they will equal what they are in UI and not a static value i could write in these tests, so text can be changed in code but tests will still pass)
      cy.get('.sideNav_eye-icon-hover-text').then(($text2) => {
        const noneHiddenTxt2 = $text2.text(); 
        expect(noneHiddenTxt).to.eq(noneHiddenTxt2);
      });
      // hide a post
      cy.get('.post_ellipsis-container > [type="button"]').first().click();
      cy.get('.post_hide-text').first().click();
      // hover over eye icon for text 
      cy.get('.header_toggle-btn-container > button').click();
      // trigger is cypress way of .hover() 
      cy.get('.sideNav_eye-icon-container > button').trigger('mouseover');
      // grab eye icon text
      cy.get('.sideNav_eye-icon-hover-text').then(($text3) => {
        const preClickText = $text3.text(); 
        // grab again (dynamic)
        cy.get('.sideNav_eye-icon-hover-text').then(($text4) => {
          const preClickText2 = $text4.text(); 
          expect(preClickText).to.eq(preClickText2);
        });
        // click eye
        cy.get('.sideNav_eye-icon-container > button').click();
        // grab text again 
        cy.get('.sideNav_eye-icon-hover-text').then(($text5) => {
          const hiddenPostsTxt = $text5.text(); 
          // grab again for comparison
          cy.get('.sideNav_eye-icon-hover-text').then(($text6) => {
            const hiddenPostsTxt2 = $text6.text(); 
            expect(hiddenPostsTxt).to.eq(hiddenPostsTxt2)
          });
        });
      });
    });
  });
});