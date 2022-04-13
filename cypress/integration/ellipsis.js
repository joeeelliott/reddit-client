describe('ellipsis.js', () => {
  beforeEach(() => {
    cy.visit('/'); 
  });

  it('adds a single saved post to saved post page correctly', () => {
    cy.get('.post_ellipsis-container > [type="button"] > .svg-inline--fa > path').first().click();
    cy.get('.post_save-text').first().click();
    cy.get('.post_outer-container').should('have.length', 10);
    cy.get('.post_title').first().then(($title => {
      const txt = $title.text();
      cy.get('.header_toggle-btn-container > button').click();
      cy.get(`input[name="saved"]`).check();
      cy.get('.post_title').first().then(($title2 => {
        const txt2 = $title2.text();
        expect(txt).to.equal(txt2);
      }));
    }));
    
    cy.get('.saved-label').then(($label) => {
      const txt = $label.text();
      expect(txt).to.eq('Saved (1)');
    });

    cy.get('.popular-label').then(($label) => {
      const txt = $label.text();
      expect(txt).to.eq('Popular (10)');
    });

    cy.get('.post_outer-container').should('have.length', 1);

    cy.get('.post_ellipsis-container > [type="button"] > .svg-inline--fa > path').click();

    cy.get('.post_save-container-clicked').should('exist');
  });

  it('adds multiple saved posts to saved posts page correctly', () => {
    cy.get('.post_ellipsis-container > [type="button"] > .svg-inline--fa > path').first().click();
    cy.get('.post_save-text').first().click();

    cy.get('.post_ellipsis-container > [type="button"] > .svg-inline--fa > path').eq(1).click();
    cy.get('.post_save-text').eq(1).click();

    cy.get('.post_outer-container').should('have.length', 10);

    cy.get('.post_title').first().then(($title => {
      const txt = $title.text();

      cy.get('.post_title').eq(1).then(($title2) => {
        const txt2 = $title2.text();
        cy.get('.header_toggle-btn-container > button').click();
        cy.get(`input[name="saved"]`).check();

        cy.get('.post_title').first().then(($title3 => {
          const txt3 = $title3.text();
          cy.get('.post_title').eq(1).then(($title4) => {
            const txt4 = $title4.text();

            expect(txt).to.equal(txt3);
            expect(txt2).to.equal(txt4);
          }); 
        }));
      });
    }));
    
    cy.get('.saved-label').then(($label) => {
      const txt = $label.text();
      expect(txt).to.eq('Saved (2)');
    });

    cy.get('.post_outer-container').should('have.length', 2);
  });

  it('adds a single hidden post to hidden post page correctly', () => {
    cy.get('.post_ellipsis-container > [type="button"] > .svg-inline--fa > path').first().click();

    cy.get('.post_title').first().then(($title => {
      const txt = $title.text();
      cy.get('.post_hide-text').first().click();
      cy.get('.post_outer-container').should('have.length', 9); 
      cy.get('.header_toggle-btn-container > button').click();
      cy.get(`input[name="hidden"]`).check();
      cy.get('.post_title').first().then(($title2 => {
        const txt2 = $title2.text();
        expect(txt).to.equal(txt2);
      }));
    }));

    cy.get('.hidden-label').then(($label) => {
      const txt = $label.text();
      expect(txt).to.eq('Hidden (1)');
    });

    cy.get('.popular-label').then(($label) => {
      const txt = $label.text();
      expect(txt).to.eq('Popular (9)');
    });

    cy.get('.post_outer-container').should('have.length', 1);

    cy.get('.post_ellipsis-container > [type="button"] > .svg-inline--fa > path').click();

    cy.get('.post_hide-container-clicked').should('exist');
  });

  it('adds multiple hidden posts to hidden posts page correctly', () => {
    cy.get('.post_title').first().then(($title => {
      const txt = $title.text();

      cy.get('.post_ellipsis-container > [type="button"] > .svg-inline--fa > path').first().click();
      cy.get('.post_hide-text').first().click();

      cy.get('.post_title').eq(1).then(($title2) => {
        const txt2 = $title2.text();

        cy.get('.post_ellipsis-container > [type="button"] > .svg-inline--fa > path').eq(1).click();
        cy.get('.post_hide-text').eq(1).click();

        cy.get('.post_outer-container').should('have.length', 8);

        cy.get('.header_toggle-btn-container > button').click();
        cy.get(`input[name="hidden"]`).check();

        cy.get('.post_title').first().then(($title3 => {
          const txt3 = $title3.text();
          cy.get('.post_title').eq(1).then(($title4) => {
            const txt4 = $title4.text();

            expect(txt).to.equal(txt3);
            expect(txt2).to.equal(txt4);
          }); 
        }));
      });
    }));
    
    cy.get('.hidden-label').then(($label) => {
      const txt = $label.text();
      expect(txt).to.eq('Hidden (2)');
    });

    cy.get('.post_outer-container').should('have.length', 2);
  });

  it('adds a single reported post to reported post page correctly', () => {
    cy.get('.post_ellipsis-container > [type="button"] > .svg-inline--fa > path').first().click();

    cy.get('.post_title').first().then(($title => {
      const txt = $title.text();
      cy.get('.post_report-text').first().click();
      cy.get('.post_outer-container').should('have.length', 10); 

      cy.get('.post_report-modal-content').should('be.visible');

      cy.get('.post_report-modal-btn-container > button').click();

      cy.get('.header_toggle-btn-container > button').click();
      cy.get(`input[name="reported"]`).check();
      cy.get('.post_title').first().then(($title2 => {
        const txt2 = $title2.text();
        expect(txt).to.equal(txt2);
      }));
    }));

    cy.get('.reported-label').then(($label) => {
      // check titles are the same 
      const txt = $label.text();
      expect(txt).to.eq('Reported (1)');
    });

    // check how many posts
    cy.get('.post_outer-container').should('have.length', 1);
    
    cy.get('.post_ellipsis-container > [type="button"] > .svg-inline--fa > path').click();

    // check the class 
    cy.get('.post_report-container-clicked').should('exist');
  });

  it('adds multiple reported posts to reported posts page correctly', () => {
    cy.get('.post_title').first().then(($title => {
      const txt = $title.text();

      cy.get('.post_ellipsis-container > [type="button"] > .svg-inline--fa > path').first().click();
      cy.get('.post_report-text').first().click();

      cy.get('.post_report-modal-content').should('be.visible');
      cy.get('.post_report-modal-btn-container > button').click();

      cy.get('.post_title').eq(1).then(($title2) => {
        const txt2 = $title2.text();

        cy.get('.post_ellipsis-container > [type="button"] > .svg-inline--fa > path').eq(1).click();
        cy.get('.post_report-text').eq(1).click();

        cy.get('.post_report-modal-content').should('be.visible');
        cy.get('.post_report-modal-btn-container > button').eq(1).click();

        cy.get('.post_outer-container').should('have.length', 10);

        cy.get('.header_toggle-btn-container > button').click();
        cy.get(`input[name="reported"]`).check();

        cy.get('.post_title').first().then(($title3 => {
          const txt3 = $title3.text();
          cy.get('.post_title').eq(1).then(($title4) => {
            const txt4 = $title4.text();

            expect(txt).to.equal(txt3);
            expect(txt2).to.equal(txt4);
          }); 
        }));
      });
    }));
    
    cy.get('.reported-label').then(($label) => {
      const txt = $label.text();
      expect(txt).to.eq('Reported (2)');
    });

    cy.get('.post_outer-container').should('have.length', 2);
  });

  it('saving multiple posts from different route pages all render correctly in saved posts filter', () => {
    // save first post from / route
    cy.get('.post_ellipsis-container > [type="button"] > .svg-inline--fa > path').first().click();
    cy.get('.post_save-text').first().click();

    // route to /sport and save first post
    cy.get('[href="/sport"] > .nav_link-text').click();
    cy.url().should('include', 'sport');
    cy.get('.post_ellipsis-container > [type="button"] > .svg-inline--fa > path').first().click();
    cy.get('.post_save-text').first().click();

    // route to /news and save first post
    cy.get('[href="/news"] > .nav_link-text').click();
    cy.url().should('include', 'news');
    cy.get('.post_ellipsis-container > [type="button"] > .svg-inline--fa > path').first().click();
    cy.get('.post_save-text').first().click();

    // filter to saved posts and check length of posts
    cy.get('.header_toggle-btn-container > button').click();
    cy.get(`input[name="saved"]`).check();
    cy.get('.post_outer-container').should('have.length', 3); 

    // saved label is correctly numbered
    cy.get('.saved-label').then(($label) => {
      const txt = $label.text();
      expect(txt).to.eq('Saved (3)');
    });

    // all posts filter 
    cy.get(`input[name="all"]`).check();
    cy.get('.post_save-container-clicked').should('have.length', 3); 
  }); 

  it('reporting multiple posts from different route pages all render correctly in reported posts filter', () => {
    // report post from / route
    cy.get('.post_ellipsis-container > [type="button"] > .svg-inline--fa > path').first().click();
    cy.get('.post_report-text').first().click();
    cy.get('.post_report-modal-content').should('be.visible');
    cy.get('.post_report-modal-btn-container > button').click();

    // report post from /sport route
    cy.get('[href="/sport"] > .nav_link-text').click();
    cy.url().should('include', 'sport');
    cy.get('.post_ellipsis-container > [type="button"] > .svg-inline--fa > path').first().click();
    cy.get('.post_report-text').first().click();
    cy.get('.post_report-modal-content').should('be.visible');
    cy.get('.post_report-modal-btn-container > button').click();

    // report post from /news route
    cy.get('[href="/news"] > .nav_link-text').click();
    cy.url().should('include', 'news');
    cy.get('.post_ellipsis-container > [type="button"] > .svg-inline--fa > path').first().click();
    cy.get('.post_report-text').first().click();
    cy.get('.post_report-modal-content').should('be.visible');
    cy.get('.post_report-modal-btn-container > button').click();

    // switch to reported page and test
    cy.get('.header_toggle-btn-container > button').click();
    cy.get(`input[name="reported"]`).check();

    cy.get('.post_outer-container').should('have.length', 3); 

    // saved label is correctly numbered
    cy.get('.reported-label').then(($label) => {
      const txt = $label.text();
      expect(txt).to.eq('Reported (3)');
    });

    // all posts filter 
    cy.get(`input[name="all"]`).check();
    cy.get('.post_report-container-clicked').should('have.length', 3); 
  }); 

  it('hiding multiple posts from different route pages all render correctly in hidden posts filter', () => {
    // hide post from / route
    cy.get('.post_ellipsis-container > [type="button"] > .svg-inline--fa > path').first().click();
    cy.get('.post_hide-text').first().click();

    // hide post from /sport route
    cy.get('[href="/sport"] > .nav_link-text').click();
    cy.url().should('include', 'sport');
    cy.get('.post_ellipsis-container > [type="button"] > .svg-inline--fa > path').first().click();
    cy.get('.post_hide-text').first().click();

    // hide post from /news route
    cy.get('[href="/news"] > .nav_link-text').click();
    cy.url().should('include', 'news');
    cy.get('.post_ellipsis-container > [type="button"] > .svg-inline--fa > path').first().click();
    cy.get('.post_hide-text').first().click();

    // switch to hidden page and test
    cy.get('.header_toggle-btn-container > button').click();
    cy.get(`input[name="hidden"]`).check();
    cy.get('.post_outer-container').should('have.length', 3); 

    // all posts filter 
    cy.get(`input[name="all"]`).check();
    cy.get('.post_hide-container-clicked').should('have.length', 3); 

    // labels are correctly numbered
    cy.get('.all-label').then(($label) => {
      const txt = $label.text();
      expect(txt).to.eq('All (27)');
    });
    cy.get('.popular-label').then(($label) => {
      const txt = $label.text();
      expect(txt).to.eq('Popular (9)');
    });
    cy.get('.sport-label').then(($label) => {
      const txt = $label.text();
      expect(txt).to.eq('Sport (9)');
    });
    cy.get('.news-label').then(($label) => {
      const txt = $label.text();
      expect(txt).to.eq('News (9)');
    });
    cy.get('.hidden-label').then(($label) => {
      const txt = $label.text();
      expect(txt).to.eq('Hidden (3)');
    });
  }); 
});