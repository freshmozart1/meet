Feature: Specify number of events
    Scenario: The default number of events is 32
        Given the user hasn't specified a number of events
        When the user opens the app
        Then the user should see a list of 32 events

    Scenario: User can change the number of events they want to see
        Given the user has opened the app
        When the user specifies the number of events they want to see
        Then the user should see a list of the specified number of events