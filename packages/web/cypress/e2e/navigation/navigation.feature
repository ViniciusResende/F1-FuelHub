Feature: Navigation

  As a user,
  I want to be able to navigate through the application,
  So that I can access different pages and features easily.

  Scenario: Display home page content correctly
    Given I open the application
    When I scroll down to the main content
    When I click on the "Drivers" link in the navigation
    Then I should be redirected to the "drivers" page
    Then I should be able to see the "Drivers" item selected in the navigation
    When I click on the "Teams" link in the navigation
    Then I should be redirected to the "teams" page
    Then I should be able to see the "Teams" item selected in the navigation
    When I click on the "Home" link in the navigation
    Then I should be redirected to the "home" page
    When I scroll down to the main content
    Then I should be able to see the "Home" item selected in the navigation
