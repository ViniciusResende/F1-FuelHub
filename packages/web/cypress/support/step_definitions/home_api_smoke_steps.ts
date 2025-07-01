import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

When('I visit the home page and let the real API request complete', () => {
  // We intercept the call to get an alias for it, but we DON'T mock the response.
  // This allows the request to go to the actual server.
  // IMPORTANT: Adjust '**/api/home' to your actual API endpoint.
  cy.intercept('GET', '**/api/home').as('getRealHomeData');

  cy.visit('/');

  // Wait for the real network request to complete.
  cy.wait('@getRealHomeData');
});

Then(
  'the API request should return a success status and the main content should appear',
  () => {
    // Assert on the response itself to confirm the contract.
    cy.get('@getRealHomeData').its('response.statusCode').should('eq', 200);

    // Perform a minimal check to ensure the page rendered something without error.
    cy.get('[data-cy="main-title"]').should('be.visible');
    cy.get('[data-cy="loader"]').should('not.exist');
  },
);
