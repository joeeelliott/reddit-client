describe('Score', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('when scored up, arrow turns green', () => {
    cy.get('.post_score-container > [aria-label="Upvote the post"] > .svg-inline--fa').first().should('exist');
    cy.get('.post_score-container > [aria-label="Upvote the post"] > .svg-inline--fa').first().click();
    cy.get('.post_score-container > [aria-label="Upvote the post"] > .svg-inline--fa').first().should('have.class', 'post_score-up-icon-clicked'); 
    cy.get('.post_score-container > [aria-label="Upvote the post"] > .svg-inline--fa').first().should('have.css', 'color', 'rgb(0, 128, 0)');
  });

  it('when scored down, arrow turns red', () => {
    cy.get('.post_score-container > [aria-label="Downvote the post"] > .svg-inline--fa').first().should('exist');
    cy.get('.post_score-container > [aria-label="Downvote the post"] > .svg-inline--fa').first().click();
    cy.get('.post_score-container > [aria-label="Downvote the post"] > .svg-inline--fa').first().should('have.class', 'post_score-down-icon-clicked'); 
    cy.get('.post_score-container > [aria-label="Downvote the post"] > .svg-inline--fa').first().should('have.css', 'color', 'rgb(255, 0, 0)');
  });

  it('if user scores a post up, then scores the same post down, the upvote arrow returns to grey and the downvote arrow turns to green', () => {
    // both arrows are grey on render
    cy.get('.post_score-container > [aria-label="Upvote the post"] > .svg-inline--fa').first().should('not.have.class', 'post_score-up-icon-clicked');
    cy.get('.post_score-container > [aria-label="Downvote the post"] > .svg-inline--fa').first().should('not.have.class', 'post_score-down-icon-clicked'); 
    cy.get('.post_score-container > [aria-label="Upvote the post"] > .svg-inline--fa').first().should('have.css', 'color', 'rgb(150, 150, 150)');
    cy.get('.post_score-container > [aria-label="Downvote the post"] > .svg-inline--fa').first().should('have.css', 'color', 'rgb(150, 150, 150)');
    // upvote post, arrow to be green
    cy.get('.post_score-container > [aria-label="Upvote the post"] > .svg-inline--fa').first().click();
    cy.get('.post_score-container > [aria-label="Upvote the post"] > .svg-inline--fa').first().should('have.class', 'post_score-up-icon-clicked'); 
    cy.get('.post_score-container > [aria-label="Upvote the post"] > .svg-inline--fa').first().should('have.css', 'color', 'rgb(0, 128, 0)');
    // downvote same post, arrow should be red
    cy.get('.post_score-container > [aria-label="Downvote the post"] > .svg-inline--fa').first().click();
    cy.get('.post_score-container > [aria-label="Downvote the post"] > .svg-inline--fa').first().should('have.class', 'post_score-down-icon-clicked'); 
    // upvote arrow now back grey
    cy.get('.post_score-container > [aria-label="Upvote the post"] > .svg-inline--fa').first().should('not.have.class', 'post_score-up-icon-clicked');
    cy.get('.post_score-container > [aria-label="Upvote the post"] > .svg-inline--fa').first().should('have.css', 'color', 'rgb(150, 150, 150)');
  });

  it('if user scores a post down, then scores the same post up, the downvote arrow returns to grey and the upvote arrow turns to green', () => {
    // both arrows are grey on render
    cy.get('.post_score-container > [aria-label="Upvote the post"] > .svg-inline--fa').first().should('not.have.class', 'post_score-up-icon-clicked');
    cy.get('.post_score-container > [aria-label="Downvote the post"] > .svg-inline--fa').first().should('not.have.class', 'post_score-down-icon-clicked'); 
    cy.get('.post_score-container > [aria-label="Upvote the post"] > .svg-inline--fa').first().should('have.css', 'color', 'rgb(150, 150, 150)');
    cy.get('.post_score-container > [aria-label="Downvote the post"] > .svg-inline--fa').first().should('have.css', 'color', 'rgb(150, 150, 150)');
    // downvote post, arrow to be red
    cy.get('.post_score-container > [aria-label="Downvote the post"] > .svg-inline--fa').first().click();
    cy.get('.post_score-container > [aria-label="Downvote the post"] > .svg-inline--fa').first().should('have.class', 'post_score-down-icon-clicked'); 
    cy.get('.post_score-container > [aria-label="Downvote the post"] > .svg-inline--fa').first().should('have.css', 'color', 'rgb(255, 0, 0)');
    // upvote same post, arrow should be green
    cy.get('.post_score-container > [aria-label="Upvote the post"] > .svg-inline--fa').first().click();
    cy.get('.post_score-container > [aria-label="Upvote the post"] > .svg-inline--fa').first().should('have.class', 'post_score-up-icon-clicked'); 
    // downvote arrow now back grey
    cy.get('.post_score-container > [aria-label="Downvote the post"] > .svg-inline--fa').first().should('not.have.class', 'post_score-down-icon-clicked');
    cy.get('.post_score-container > [aria-label="Downvote the post"] > .svg-inline--fa').first().should('have.css', 'color', 'rgb(150, 150, 150)');
  });
});