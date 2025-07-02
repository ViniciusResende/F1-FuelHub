Feature: Home Page

  As a user,
  I want to see the main information on the home page,
  So that I can get a quick overview of F1 stats.

  Scenario: Display home page content correctly
    Given I intercept the API calls for the home page
    When I visit the home page
    Then I should see the landing section with title and subtitle
    When I scroll down to the main content
    Then I should see the most voted team section with the correct data
    Then I should see the top pole position drivers section with the correct data
    Then I should see the fastest pit stops section
    Then I should see the top speed record section