# Meet

## User Stories:

### Filter events by city
As a user, I would like to be able to filter events by city so that I can see the list of events that
take place in that city.

### Show/hide event details
As a user, I would like to be able to show/hide event details so that I can see more/less
information about an event.

### Specify number of events
As a user, I would like to be able to specify the number of events I want to view in the app so
that I can see more or fewer events in the events list at once.

### Use the app offline
As a user, I would like to be able to use the app when oﬄine so that I can see the events I
viewed the last time I was online.

### Add an app shortcut to the home screen
As a user, I would like to be able to add the app shortcut to my home screen so that I can
open the app faster.

### Display charts visualizing event details
As a user, I would like to be able to see a chart showing the upcoming events in each city so
that I know what events are organized in which city.

## Scenarios:

### Filter events by city

- Given: The user is on the main event listing page
- When: The user searches for a city by entering the city name in the search bar
- Then: The app should display a list of upcoming events in the selected city

### Show/hide event details

#### Scenario 1

- Given: The event details are hidden by default
- When: The user clicks the “Show Details” button on an event
- Then: The app should display additional details about the selected event

#### Scenario 2

- Given: The event details are currently displayed
- When: The user clicks the “Hide Details” button on the event
- Then: The app should hide the event details

### Specify number of events

#### Scenario 1

- Given: The user views the event listing page
- When: The user has not specified how many events to display
- Then: The app should display all events by default

#### Scenario 2

- Given: The user views the event listing page
- When: The user selects a number of events to display from a dropdown or input field
- Then: The app should display the specified number of events

### Use the app offline

#### Scenario 1

- Given: The user is offline and has previously viewed events
- When: The user opens the app while offline
- Then: The app should display cached data from the last time the user was online

#### Scenario 2

- Given: The user is offline
- When: The user tries to search for a new city or change the number of events
- Then: The app should show an error message indicating that the user is offline and cannot fetch new data

### Add an app shortcut to the home screen

- Given: The user is using a mobile device or browser
- When: The user clicks the “Add to Home Screen” prompt
- Then: The app should install a shortcut on the user’s home screen for quick access

### Display charts visualizing event details

- Given: The user is viewing a list of events in multiple cities.
- When: The user navigates to the “Event Statistics” section.
- Then: The app should display a chart showing the number of upcoming events in each city.