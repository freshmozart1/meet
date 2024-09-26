// src/__tests__/App.test.js

import { render, screen, waitFor } from '@testing-library/react';

import App from '../App';
import React from 'react';

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