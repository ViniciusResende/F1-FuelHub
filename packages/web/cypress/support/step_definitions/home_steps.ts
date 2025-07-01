import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('I have mocked the home page API response', () => {
  // Intercept the GET request for home data and respond with our mock fixture.
  // IMPORTANT: Adjust '/api/home' to your actual API endpoint.
  cy.intercept('GET', '**/api/home', { fixture: 'homeData.json' }).as(
    'getHomeData',
  );
});

When('I visit the home page', () => {
  // Since we set a baseUrl in cypress.config.ts, we can just use '/'
  cy.visit('/');
});

Then(
  'the page content should be displayed correctly based on the mocked data',
  () => {
    // First, check for the loader. Because the mocked response is instant,
    // the loader might only flash briefly. This command will pass if it's visible, even for a moment.
    // We then wait for the API call to ensure the page has time to re-render.
    // Note: Using data-cy attributes is a best practice for stable test selectors.
    cy.get('[data-cy="loader"]').should('be.visible');
    cy.wait('@getHomeData');
    cy.get('[data-cy="loader"]').should('not.exist');

    // Now, verify the content using data from our fixture
    cy.fixture('homeData.json').then((homeData) => {
      // Check static content
      cy.get('[data-cy="main-title"]').should(
        'contain.text',
        'Welcome to F1 FuelHub',
      );

      // Check "Most Voted Team" section
      // Using data-cy attributes makes tests less likely to break if class names change.
      // e.g., <span data-cy="most-voted-votes">{team.voteCount}</span>
      cy.get('[data-cy="most-voted-votes"]').should(
        'have.text',
        homeData.mostVotedTeam.voteCount,
      );
      // e.g., <div data-cy="most-voted-team-name">{team.teamName}</div>
      cy.get('[data-cy="most-voted-team-name"]').should(
        'contain.text',
        homeData.mostVotedTeam.teamName,
      );
    });
  },
);
