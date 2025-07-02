import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

Then('I click the card of the {string} team', (teamName: string) => {
  cy.intercept('POST', '**/api/votes', {
    statusCode: 204,
    body: {},
  }).as('postVote');

  cy.contains('[data-cy="team-list-item"]', teamName).click();
});

Then('I should see the voting modal', () => {
  cy.get('[data-cy="voting-modal"]').should('be.visible');
});

When('I fill in my email and confirm', () => {
  cy.get('[data-cy="voting-modal"]').within(() => {
    cy.get('input[type="email"]').type('test.user@example.com');
    cy.contains('button', 'Confirm').click();
  });
});

Then('I should see my favorite team as {string}', (teamName: string) => {
  cy.wait('@postVote').its('request.body').should('deep.include', {
    team: teamName,
    email: 'test.user@example.com',
  });

  cy.get('[data-cy="voting-modal"]').should('not.be.visible');
  cy.contains('[data-cy="team-list-item"]', teamName).should(
    'have.class',
    'favorite',
  );
});
