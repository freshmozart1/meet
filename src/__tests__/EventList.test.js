// src/__tests__/EventList.test.js

import { render, screen, waitFor, within } from '@testing-library/react';
import EventList from '../components/EventList';
import App from '../App';
import userEvent from '@testing-library/user-event';
import React, { act } from 'react';
import mockEvents from '../mock-data';

describe('<EventList /> component', () => {
    test('has an element with "list" role', () => {
        render(<EventList />);
        expect(screen.getByRole('list')).toBeInTheDocument();
    });
    test('renders correct number of events', async () => {
        render(<EventList events={mockEvents} />);
        expect(screen.getAllByRole('listitem')).toHaveLength(mockEvents.length);
    });
});

describe('<EventList /> integration', () => {
    test('show 32 events by default', async () => {
        render(<App />);
        let eventList;
        let eventListItems = [];
        await waitFor(() => {
            eventList = screen.getAllByRole('list')[1];
        });
        expect(eventList).toHaveAttribute('id', 'event-list');
        await waitFor(() => {
            eventListItems = within(eventList).getAllByRole('listitem');
        });
        expect(eventListItems.length).toBe(32);
    });
    test('shows correct number of events when user enters a number in the NumberOfEvents input', async () => {
        render(<App />);
        const user = userEvent.setup();
        const numberOfEvents = 10;
        let eventList, numberOfEventsInput;
        await waitFor(() => {
            eventList = screen.getAllByRole('list')[1];
            numberOfEventsInput = screen.getByLabelText('Events on page:');
        });
        expect(eventList).toHaveAttribute('id', 'event-list');
        await act(async () => {
            await user.clear(numberOfEventsInput);
            await user.type(numberOfEventsInput, numberOfEvents.toString());
        });
        expect(within(eventList).getAllByRole('listitem').length).toBe(numberOfEvents);
    });
});