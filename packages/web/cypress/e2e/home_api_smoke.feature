Feature: Home Page API Integration

  @smoke
  Scenario: Verifies the API contract for the home page
    When I visit the home page and let the real API request complete
    Then the API request should return a success status and the main content should appear