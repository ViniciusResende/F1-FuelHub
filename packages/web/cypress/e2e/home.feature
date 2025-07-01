Feature: Home Page Loading and Content Display

Scenario: Successfully loads and displays content from the API
Given I have mocked the home page API response
When I visit the home page
Then the page content should be displayed correctly based on the mocked data
