Feature: Voting Feature

  As a user,
  I want to be able to vote for my favorite F1 team,
  So that I can contribute to the community and see the most voted team.

  Scenario: Allow voting for teams and displaying stats
    Given I intercept the API calls for the teams page
    When I visit the teams page
    When I scroll down to the teams listing
    Then I click the card of the "McLaren" team
    Then I should see the voting modal
    When I fill in my email and confirm
    Then I should see my favorite team as "McLaren"
