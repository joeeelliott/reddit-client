describe('postFilters.js', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('loads the correct number of posts next to the post filters on initial render', () => {
    cy.wait(3000);
    cy.get('.header_toggle-btn-container > button').click();
    cy.get('.all-label').then(($label) => {
      const txt = $label.text();
      expect(txt).to.eq('All (30)');
    });
    cy.get('.popular-label').then(($label) => {
      const txt = $label.text();
      expect(txt).to.eq('Popular (10)');
    });
    cy.get('.sport-label').then(($label) => {
      const txt = $label.text();
      expect(txt).to.eq('Sport (10)');
    });
    cy.get('.news-label').then(($label) => {
      const txt = $label.text();
      expect(txt).to.eq('News (10)');
    });
    cy.get('.saved-label').then(($label) => {
      const txt = $label.text();
      expect(txt).to.eq('Saved (0)');
    });
    cy.get('.hidden-label').then(($label) => {
      const txt = $label.text();
      expect(txt).to.eq('Hidden (0)');
    });
    cy.get('.reported-label').then(($label) => {
      const txt = $label.text();
      expect(txt).to.eq('Reported (0)');
    });
  });

  it('loads correct posts on post filter pages from initial render', () => {
    // all
    cy.get('.header_toggle-btn-container > button').click();
    cy.get(`input[name="all"]`).check();
    cy.get('.popular-post').should('have.length', 10); 
    cy.get('.sport-post').should('have.length', 10); 
    cy.get('.news-post').should('have.length', 10); 
    // popular
    cy.get(`input[name="popular"]`).check();
    cy.get('.popular-post').should('have.length', 10); 
    cy.get('.sport-post').should('not.exist');
    cy.get('.news-post').should('not.exist');
    // sport
    cy.get(`input[name="sport"]`).check();
    cy.get('.sport-post').should('have.length', 10); 
    cy.get('.popular-post').should('not.exist');
    cy.get('.news-post').should('not.exist');
    // news
    cy.get(`input[name="news"]`).check();
    cy.get('.news-post').should('have.length', 10); 
    cy.get('.popular-post').should('not.exist');
    cy.get('.sport-post').should('not.exist');
    // saved 
    cy.get(`input[name="saved"]`).check();
    cy.get('.post_no-posts > h1').should('exist'); 
    cy.get('.news-post').should('not.exist'); 
    cy.get('.popular-post').should('not.exist');
    cy.get('.sport-post').should('not.exist');
    // hidden
    cy.get(`input[name="hidden"]`).check();
    cy.get('.post_no-posts > h1').should('exist'); 
    cy.get('.news-post').should('not.exist'); 
    cy.get('.popular-post').should('not.exist');
    cy.get('.sport-post').should('not.exist');
    // reported
    cy.get(`input[name="reported"]`).check();
    cy.get('.post_no-posts > h1').should('exist'); 
    cy.get('.news-post').should('not.exist'); 
    cy.get('.popular-post').should('not.exist');
    cy.get('.sport-post').should('not.exist');
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

  it('unsaving the only post in the saved posts page works', () => {
    cy.get('.post_ellipsis-container > [type="button"] > .svg-inline--fa > path').first().click();
    cy.get('.post_save-text').first().click();
    cy.get('.header_toggle-btn-container > button').click();
    cy.get(`input[name="saved"]`).check();

    cy.get('.post_ellipsis-container > [type="button"] > .svg-inline--fa > path').first().click();
    cy.get('.post_save-text').first().click();

    cy.get('.post_no-posts > h1').should('be.visible');
  });

  it('unsaving the only post in the hidden posts page works', () => {
    cy.get('.post_ellipsis-container > [type="button"] > .svg-inline--fa > path').first().click();
    cy.get('.post_hide-text').first().click();
    cy.get('.header_toggle-btn-container > button').click();
    cy.get(`input[name="hidden"]`).check();

    cy.get('.post_ellipsis-container > [type="button"] > .svg-inline--fa > path').first().click();
    cy.get('.post_hide-text').first().click();

    cy.get('.post_no-posts > h1').should('be.visible');
  });

  it('unsaving the only post in the reported posts page works', () => {
    cy.get('.post_ellipsis-container > [type="button"] > .svg-inline--fa > path').first().click();
    cy.get('.post_report-text').first().click();

    cy.get('.post_report-modal-content').should('be.visible');
    cy.get('.post_report-modal-btn-container > button').click();

    cy.get('.header_toggle-btn-container > button').click();
    cy.get(`input[name="reported"]`).check();

    cy.get('.post_ellipsis-container > [type="button"] > .svg-inline--fa > path').first().click();
    cy.get('.post_report-text').first().click();

    cy.get('.post_no-posts > h1').should('be.visible');
  });

  it('a post hidden whilst in the filtered saved posts page, is hidden in all associated pages/routes', () => {
    // switch to sport route
    cy.get('[href="/sport"] > .nav_link-text').click();
    cy.url().should('include', 'sport');

    // save post and go to saved posts page 
    cy.get('.post_ellipsis-container > [type="button"] > .svg-inline--fa > path').first().click();
    cy.get('.post_save-text').first().click();
    cy.get('.header_toggle-btn-container > button').click();
    cy.get(`input[name="saved"]`).check();

    // hide the same post
    cy.get('.post_ellipsis-container > [type="button"] > .svg-inline--fa > path').first().click();
    cy.get('.post_hide-text').first().click();

    // post should stay in saved posts page 
    cy.get('.post_outer-container').should('have.length', 1);
    cy.get('.post_hide-container-clicked').should('exist');
    cy.get('.post_save-container-clicked').should('exist');

    // use navlink to re-route and test
    cy.get('[href="/sport"] > .nav_link-text').click();
    cy.url().should('include', 'sport');
    cy.get('.post_outer-container').should('have.length', 9);
    cy.get('.post_hide-container-clicked').should('exist');

    // filter to sports posts and test
    cy.get('.header_toggle-btn-container > button').click();
    cy.get(`input[name="sport"]`).check();
    cy.get('.post_outer-container').should('have.length', 9);
    cy.get('.post_hide-container-clicked').should('exist');

    // filter to all posts and test
    cy.get(`input[name="all"]`).check();
    cy.get('.post_outer-container').should('have.length', 29);
    cy.get('.post_hide-container-clicked').should('exist');

    // filter to hidden and test
    cy.get(`input[name="hidden"]`).check();
    cy.get('.post_outer-container').should('have.length', 1);
    cy.get('.post_hide-container-clicked').should('exist');

    // all label is correctly numbered
    cy.get('.all-label').then(($label) => {
      const txt = $label.text();
      expect(txt).to.eq('All (29)');
    });

    // sport label is correctly numbered
    cy.get('.sport-label').then(($label) => {
      const txt = $label.text();
      expect(txt).to.eq('Sport (9)');
    });
  });

  it('a post hidden whilst in the filtered reported posts page, is hidden in all associated pages/routes', () => {
    // report post and go to reported posts page 
    cy.get('.post_ellipsis-container > [type="button"] > .svg-inline--fa > path').first().click();
    cy.get('.post_report-text').first().click();

    cy.get('.post_report-modal-content').should('be.visible');
    cy.get('.post_report-modal-btn-container > button').click();

    cy.get('.header_toggle-btn-container > button').click();
    cy.get(`input[name="reported"]`).check();

    // hide the same post
    cy.get('.post_ellipsis-container > [type="button"] > .svg-inline--fa > path').first().click();
    cy.get('.post_hide-text').first().click();

    // post should stay in reported posts page 
    cy.get('.post_outer-container').should('have.length', 1); 
    cy.get('.post_hide-container-clicked').should('exist');
    cy.get('.post_report-container-clicked').should('exist');

    // use navlink to re-route and test
    cy.get('[href="/"] > .nav_link-text').click();
    cy.url().should('include', '/');
    cy.get('.post_outer-container').should('have.length', 9);
    cy.get('.post_hide-container-clicked').should('exist');

    // filter to popular posts and test
    cy.get('.header_toggle-btn-container > button').click();
    cy.get(`input[name="popular"]`).check();
    cy.get('.post_outer-container').should('have.length', 9);
    cy.get('.post_hide-container-clicked').should('exist');

    // filter to all posts and test
    cy.get(`input[name="all"]`).check();
    cy.get('.post_outer-container').should('have.length', 29);
    cy.get('.post_hide-container-clicked').should('exist');

    // filter to hidden and test
    cy.get(`input[name="hidden"]`).check();
    cy.get('.post_outer-container').should('have.length', 1);
    cy.get('.post_hide-container-clicked').should('exist');

    // all label is correctly numbered
    cy.get('.all-label').then(($label) => {
      const txt = $label.text();
      expect(txt).to.eq('All (29)');
    });

    // popular label is correctly numbered
    cy.get('.popular-label').then(($label) => {
      const txt = $label.text();
      expect(txt).to.eq('Popular (9)');
    });
  });

  it('a post reported whilst in the filtered saved posts page, is reported in all associated pages/routes', () => {
    // switch to news route
    cy.get('[href="/news"] > .nav_link-text').click();
    cy.url().should('include', 'news');

    // save post and go to saved posts page 
    cy.get('.post_ellipsis-container > [type="button"] > .svg-inline--fa > path').first().click();
    cy.get('.post_save-text').first().click();
    cy.get('.header_toggle-btn-container > button').click();
    cy.get(`input[name="saved"]`).check();

    // report the same post
    cy.get('.post_ellipsis-container > [type="button"] > .svg-inline--fa > path').first().click();
    cy.get('.post_report-text').first().click();
    cy.get('.post_report-modal-content').should('be.visible');
    cy.get('.post_report-modal-btn-container > button').click();

    // post should stay in saved posts page 
    cy.get('.post_outer-container').should('have.length', 1); 

    // use navlink to re-route and test
    cy.get('[href="/news"] > .nav_link-text').click();
    cy.url().should('include', 'news');
    cy.get('.post_save-container-clicked').should('exist');

    // filter to news posts and test
    cy.get('.header_toggle-btn-container > button').click();
    cy.get(`input[name="news"]`).check();
    cy.get('.post_save-container-clicked').should('exist');

    // filter to all posts and test
    cy.get(`input[name="all"]`).check();
    cy.get('.post_save-container-clicked').should('exist');

    // filter to reported and test
    cy.get(`input[name="reported"]`).check();
    cy.get('.post_outer-container').should('have.length', 1);

    // reported label is correctly numbered
    cy.get('.reported-label').then(($label) => {
      const txt = $label.text();
      expect(txt).to.eq('Reported (1)');
    });
  });

  it('a post reported whilst in the filtered hidden posts page, is reported in all associated pages/routes', () => {
    // hide post and go to hidden posts page 
    cy.get('.post_ellipsis-container > [type="button"] > .svg-inline--fa > path').first().click();
    cy.get('.post_hide-text').first().click();
    cy.get('.header_toggle-btn-container > button').click();
    cy.get(`input[name="hidden"]`).check();

    // report the same post
    cy.get('.post_ellipsis-container > [type="button"] > .svg-inline--fa > path').first().click();
    cy.get('.post_report-text').first().click();

    cy.get('.post_report-modal-content').should('be.visible');
    cy.get('.post_report-modal-btn-container > button').click();

    // post should stay in hidden posts page 
    cy.get('.post_outer-container').should('have.length', 1); 
    cy.get('.post_hide-container-clicked').should('exist');
    cy.get('.post_report-container-clicked').should('exist');

    // use navlink to re-route and test
    cy.get('[href="/"] > .nav_link-text').click();
    cy.url().should('include', '/');
    cy.get('.post_report-container-clicked').should('exist');

    // filter to popular posts and test
    cy.get('.header_toggle-btn-container > button').click();
    cy.get(`input[name="popular"]`).check();
    cy.get('.post_report-container-clicked').should('exist');

    // filter to all posts and test
    cy.get(`input[name="all"]`).check();
    cy.get('.post_report-container-clicked').should('exist');

    // filter to reported and test
    cy.get(`input[name="reported"]`).check();
    cy.get('.post_outer-container').should('have.length', 1);
    cy.get('.post_report-container-clicked').should('exist');

    // reported label is correctly numbered
    cy.get('.reported-label').then(($label) => {
      const txt = $label.text();
      expect(txt).to.eq('Reported (1)');
    });
  });

  it('a post saved whilst in the filtered hidden posts page, is saved in all associated pages/routes', () => {
    // hide post and go to hidden posts page 
    cy.get('.post_ellipsis-container > [type="button"] > .svg-inline--fa > path').first().click();
    cy.get('.post_hide-text').first().click();
    cy.get('.header_toggle-btn-container > button').click();
    cy.get(`input[name="hidden"]`).check();

    // save the same post
    cy.get('.post_ellipsis-container > [type="button"] > .svg-inline--fa > path').first().click();
    cy.get('.post_save-text').first().click();

    // post should stay in hidden posts page 
    cy.get('.post_outer-container').should('have.length', 1); 
    cy.get('.post_hide-container-clicked').should('exist');
    cy.get('.post_save-container-clicked').should('exist');

    // use navlink to re-route and test
    cy.get('[href="/"] > .nav_link-text').click();
    cy.url().should('include', '/');
    cy.get('.post_save-container-clicked').should('exist');

    // filter to popular posts and test
    cy.get('.header_toggle-btn-container > button').click();
    cy.get(`input[name="popular"]`).check();
    cy.get('.post_save-container-clicked').should('exist');

    // filter to all posts and test
    cy.get(`input[name="all"]`).check();
    cy.get('.post_save-container-clicked').should('exist');

    // filter to reported and test
    cy.get(`input[name="saved"]`).check();
    cy.get('.post_outer-container').should('have.length', 1);
    cy.get('.post_save-container-clicked').should('exist');

    // reported label is correctly numbered
    cy.get('.saved-label').then(($label) => {
      const txt = $label.text();
      expect(txt).to.eq('Saved (1)');
    });
  });

  it('a post saved whilst in the filtered reported posts page, is saved in all associated pages/routes', () => {
    // hide post and go to hidden posts page 
    cy.get('.post_ellipsis-container > [type="button"] > .svg-inline--fa > path').first().click();
    cy.get('.post_report-text').first().click();
    cy.get('.post_report-modal-content').should('be.visible');
    cy.get('.post_report-modal-btn-container > button').click();
    cy.get('.header_toggle-btn-container > button').click();
    cy.get(`input[name="reported"]`).check();

    // save the same post
    cy.get('.post_ellipsis-container > [type="button"] > .svg-inline--fa > path').first().click();
    cy.get('.post_save-text').first().click();

    // post should stay in reported posts page 
    cy.get('.post_outer-container').should('have.length', 1); 
    cy.get('.post_report-container-clicked').should('exist');
    cy.get('.post_save-container-clicked').should('exist');

    // use navlink to re-route and test
    cy.get('[href="/"] > .nav_link-text').click();
    cy.url().should('include', '/');
    cy.get('.post_save-container-clicked').should('exist');

    // filter to popular posts and test
    cy.get('.header_toggle-btn-container > button').click();
    cy.get(`input[name="popular"]`).check();
    cy.get('.post_save-container-clicked').should('exist');

    // filter to all posts and test
    cy.get(`input[name="all"]`).check();
    cy.get('.post_save-container-clicked').should('exist');

    // filter to reported and test
    cy.get(`input[name="saved"]`).check();
    cy.get('.post_outer-container').should('have.length', 1);
    cy.get('.post_save-container-clicked').should('exist');

    // saved label is correctly numbered
    cy.get('.saved-label').then(($label) => {
      const txt = $label.text();
      expect(txt).to.eq('Saved (1)');
    });
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