import '@testing-library/cypress/add-commands';

// Cypress.Commands.add('isNotInViewport', element => {
//   cy.get(element).should($el => {
//     const bottom = Cypress.$(cy.state('window')).height()
//     const rect = $el[0].getBoundingClientRect()

//     expect(rect.top).to.be.greaterThan(bottom)
//     expect(rect.bottom).to.be.greaterThan(bottom)
//     expect(rect.top).to.be.greaterThan(bottom)
//     expect(rect.bottom).to.be.greaterThan(bottom)
//   })
// })

// Cypress.Commands.add('isInViewport', element => {
//   cy.get(element).should($el => {
//     const bottom = Cypress.$(cy.state('window')).height()
//     const rect = $el[0].getBoundingClientRect()

//     expect(rect.top).not.to.be.greaterThan(bottom)
//     expect(rect.bottom).not.to.be.greaterThan(bottom)
//     expect(rect.top).not.to.be.greaterThan(bottom)
//     expect(rect.bottom).not.to.be.greaterThan(bottom)
//   })
// })

