import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('I intercept the API calls for the teams page', () => {
  cy.intercept('GET', '**/api/votes', { fixture: 'votes.json' }).as('getVotes');
});

When('I visit the teams page', () => {
  cy.visit('/teams');
  cy.wait('@getVotes');
});

Then('I should see the Most Voted Team stats', () => {
  cy.get('@getVotes')
    .its('response.body.data')
    .then((data) => {
      const mostVotedTeam = data[0];
      // Assuming a similar component to the home page
      cy.get('[data-cy="most-voted-team-section"]').within(() => {
        cy.get('.f1-team-card main>h3').should(
          'have.text',
          `${mostVotedTeam.votes.toString()} Votes`,
        );
        cy.get('.f1-team-card footer strong').should(
          'contain.text',
          mostVotedTeam.team,
        );
      });
    });
});

When('I scroll down to the teams listing', () => {
  cy.get('[data-cy="all-teams-section"]').scrollIntoView();
});

Then('I should see the All Teams section with the correct data', () => {
  cy.get('@getVotes')
    .its('response.body.data')
    .then((allTeams) => {
      const expectedTeamNames = allTeams.map(
        (team: { team: string }) => team.team,
      );

      cy.get('[data-cy="all-teams-section"]').within(() => {
        // First, verify that the number of displayed teams matches the API response.
        cy.get('[data-cy="team-list-item"]').should(
          'have.length',
          expectedTeamNames.length,
        );

        // Then, verify that each team from the API is visible on the page, regardless of order.
        expectedTeamNames.forEach((teamName: string) => {
          cy.contains('[data-cy="team-list-item"]', teamName).should(
            'be.visible',
          );
        });
      });
    });
});
