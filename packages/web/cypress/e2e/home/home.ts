import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('I intercept the API calls for the home page', () => {
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

When('I visit the home page', () => {
  cy.visit('/');
  cy.wait([
    '@getVotes',
    '@getTopPoles',
    '@getFastestPitstops',
    '@getTopLatestSpeed',
  ]);
});

Then('I should see the landing section with title and subtitle', () => {
  cy.wait(1500); // Wait for animations or transitions
  cy.get('[data-cy="landing-title"]').should('be.visible');
  cy.get('[data-cy="landing-subtitle"]').should('be.visible');
});

When('I scroll down to the main content', () => {
  cy.get('[data-cy="scroll-button"]').click();
});

Then('I should see the most voted team section with the correct data', () => {
  cy.get('@getVotes')
    .its('response.body.data')
    .then((data) => {
      const mostVotedTeam = data[0];

      cy.get('[data-cy="most-voted-section"]').within(() => {
        cy.get('[data-cy="most-voted-count"]').should(
          'have.text',
          mostVotedTeam.votes.toString(),
        );
        cy.get('.f1-team-card h3').should('contain.text', mostVotedTeam.team);
      });
    });
});

Then(
  'I should see the top pole position drivers section with the correct data',
  () => {
    cy.get('@getTopPoles')
      .its('response.body.data')
      .then((topDrivers) => {
        cy.get('[data-cy="top-drivers-section"]').within(() => {
          cy.get('.driver-card').each(($card, index) => {
            cy.wrap($card)
              .find('h3')
              .should('contain.text', topDrivers[index].name);
          });
        });
      });
  },
);

Then('I should see the fastest pit stops section', () => {
  cy.get('@getFastestPitstops')
    .its('response.body.data')
    .then((pitstops) => {
      cy.get('[data-cy="fastest-pitstops-section"]').within(() => {
        // Check current year record
        cy.get('.pitstop-card.current-year').within(() => {
          cy.get('>h3').should(
            'contain.text',
            `Fastest Pit Stop ${pitstops.currentYear.year}`,
          );
          cy.get('.f1-team-card h3').should(
            'have.text',
            `${pitstops.currentYear.time.toFixed(2)}s`,
          );
          cy.get('.f1-team-card p').should(
            'contain.text',
            pitstops.currentYear.team,
          );
        });

        // Check all-time record
        cy.get('.pitstop-card.all-time').within(() => {
          cy.get('>h3').should('have.text', 'All-Time Record');
          cy.get('.f1-team-card h3').should(
            'have.text',
            `${pitstops.overall.time.toFixed(2)}s`,
          );
          cy.get('.f1-team-card p').should(
            'contain.text',
            pitstops.overall.team,
          );
        });
      });
    });
});

Then('I should see the top speed record section', () => {
  cy.get('@getTopLatestSpeed')
    .its('response.body.data')
    .then((speedData) => {
      cy.get('[data-cy="top-speed-section"]').within(() => {
        cy.get('.speed-card h3').should(
          'contain.text',
          `${speedData.speed.toFixed(1)} km/h`,
        );
        cy.get('.speed-card footer strong').should(
          'contain.text',
          `${speedData.team}`,
        );
      });
    });
});
