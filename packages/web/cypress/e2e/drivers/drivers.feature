Feature: Drivers Page

  As a user,
  I want to see the F1 drivers information on the drivers page,
  So that I can get a comprehensive view of their performance.

  Scenario: Display drivers page content correctly
    Given I intercept the API calls for the drivers page
    When I visit the drivers page
    Then I should see the Top Pole Position Drivers stats
    When I scroll down to the drivers listing
    Then I should see the All Drivers section with the correct data