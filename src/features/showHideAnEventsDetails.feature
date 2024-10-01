Feature: Show/hide event details
    Scenario: A user wants to view more details about an event.
        Given the user hasn't opened the event details
        When the user clicks on the event
        Then the user should see the event details

    Scenario: A user wants to hide the details of an event.
        Given the user has opened the event details
        When the user clicks on the event
        Then the user should not see the event details