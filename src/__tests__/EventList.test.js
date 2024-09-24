// src/__tests__/EventList.test.js

import { render, screen } from '@testing-library/react';
import EventList from '../components/EventList';
import { getEvents } from '../api';

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