import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('I intercept the API calls for the drivers page', () => {
  cy.intercept('GET', '**/api/drivers/top-poles', {
    fixture: 'top-poles.json',
  }).as('getTopPoles');
  cy.intercept('GET', '**/api/drivers', { fixture: 'drivers.json' }).as(
    'getDrivers',
  );
});

When('I visit the drivers page', () => {
  cy.visit('/drivers');
  cy.wait(['@getTopPoles', '@getDrivers']);
});

Then('I should see the Top Pole Position Drivers stats', () => {
  cy.get('@getTopPoles')
    .its('response.body.data')
    .then((topDrivers) => {
      // Assuming the same component as the home page
      cy.get('[data-cy="top-drivers-section"]').within(() => {
        cy.get('.top-driver-card').each(($card, index) => {
          cy.wrap($card)
            .find('.driver-name')
            .should('contain.text', topDrivers[index].name);
        });
      });
    });
});

When('I scroll down to the drivers listing', () => {
  cy.get('[data-cy="all-drivers-section"]').scrollIntoView();
});

Then('I should see the All Drivers section with the correct data', () => {
  cy.get('@getDrivers')
    .its('response.body.data')
    .then((allDrivers) => {
      cy.get('[data-cy="all-drivers-section"]').within(() => {
        // Assuming a selector for each driver item in the list
        cy.get('[data-cy="driver-list-item"]').each(($item, index) => {
          const driver = allDrivers[index];
          cy.wrap($item)
            .find('.driver-info .driver-name')
            .should('have.text', driver.name);
          cy.wrap($item)
            .find('.driver-info .team-logo img')
            .should('have.attr', 'alt')
            .and('contain', 'team logo');
        });
      });
    });
});
