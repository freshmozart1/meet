// src/__tests__/App.test.js

import { render, screen, waitFor, within } from '@testing-library/react';

import App from '../App';
import React, { act } from 'react';
import userEvent from '@testing-library/user-event';

describe('<App /> component', () => {
    test('shows list of events', async () => {
        render(<App />);
        let eventList;
        await waitFor(() => {
            eventList = screen.getAllByRole('list')[1];
        });
        expect(eventList).toBeInTheDocument();
        expect(eventList).toHaveAttribute('id', 'event-list');
    });
    test('shows CitySearch input', async () => {
        render(<App />);
        let citySearch;
        await waitFor(() => {
            citySearch = screen.getByPlaceholderText('Search for a city');
        });
        expect(citySearch).toBeInTheDocument();
    });
    test('shows NumberOfEvents input', async () => {
        render(<App />);
        let numberOfEvents;
        await waitFor(() => {
            numberOfEvents = screen.getByLabelText('Events on page:')
        });
        expect(numberOfEvents).toBeInTheDocument();
    });
});

describe('<App /> integration', () => {
    test('renders a list of events matching the city selected by the user', async () => {
        render(<App />);
        const user = userEvent.setup();
        let citySearchInput, citySearchList, eventList;
        await waitFor(() => {
            citySearchInput = screen.getByPlaceholderText('Search for a city');
            const _lists = screen.getAllByRole('list');
            citySearchList = _lists[0];
            eventList = _lists[1];
        });
        expect(citySearchList).toHaveClass('no-caret nav-item dropdown');
        expect(eventList).toHaveAttribute('id', 'event-list');
        await act(async () => { await user.type(citySearchInput, 'Berlin') });
        const berlinSuggestionItem = within(citySearchList).queryByText('Berlin, Germany');
        expect(berlinSuggestionItem).toBeInTheDocument();
        await act(async () => { await user.click(berlinSuggestionItem) });
        const eventListItems = within(eventList).getAllByRole('listitem');
        expect(eventListItems.every(item => item.textContent.includes('Berlin'))).toBe(true);
    });
});