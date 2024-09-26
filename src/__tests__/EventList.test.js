// src/__tests__/EventList.test.js

import { render, screen, waitFor, within } from '@testing-library/react';
import EventList from '../components/EventList';
import { getEvents } from '../api';
import App from '../App';

describe('<EventList /> component', () => {
    test('has an element with "list" role', () => {
        render(<EventList />);
        expect(screen.getByRole('list')).toBeInTheDocument();
    });
    test('renders correct number of events', async () => {
        const mockEvents = await getEvents();
        render(<EventList events={mockEvents} />);
        expect(screen.getAllByRole('listitem')).toHaveLength(mockEvents.length);
    });
});

describe('<EventList /> integration', () => {
    test('show 32 events by default', async () => {
        render(<App />);
        let eventList;
        await waitFor(() => {
            eventList = screen.getAllByRole('list')[1];
        });
        expect(eventList).toHaveAttribute('id', 'event-list');
        expect(within(eventList).getAllByRole('listitem').length).toBe(32);
    });
});