import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

before(() => {
  cy.intercept('GET', '**/api/votes', { fixture: 'votes.json' }).as('getVotes');
  cy.intercept('GET', '**/api/drivers/top-poles', {
    fixture: 'top-poles.json',
  }).as('getTopPoles');
  cy.intercept('GET', '**/api/pitstops/fastest', {
    fixture: 'fastest-pitstops.json',
  }).as('getFastestPitstops');
  cy.intercept('GET', '**/api/speed/top-latest', {
    fixture: 'top-latest-speed.json',
  }).as('getTopLatestSpeed');
});

Given('I open the application', () => {
  cy.visit('/');
});

When('I click on the {string} link in the navigation', (linkText: string) => {
  cy.get('[data-cy="navbar"]').contains('.navigation-link', linkText).click();
});

Then('I should be redirected to the {string} page', (page: string) => {
  const path = page.toLowerCase() === 'home' ? '/' : `/${page.toLowerCase()}`;
  cy.url().should('include', path);
});

Then(
  'I should be able to see the {string} item selected in the navigation',
  (pageName: string) => {
    cy.get('.navigation-link.selected').should('have.text', pageName);
  },
);
