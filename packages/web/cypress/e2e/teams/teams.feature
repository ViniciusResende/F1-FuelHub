Feature: Teams Page

  As a user,
  I want to see the F1 teams information on the teams page,
  So that I can get a comprehensive view of their performance.

  Scenario: Display teams page content correctly
    Given I intercept the API calls for the teams page
    When I visit the teams page
    Then I should see the Most Voted Team stats
    When I scroll down to the teams listing
    Then I should see the All Teams section with the correct data