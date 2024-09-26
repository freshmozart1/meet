// src/__tests__/App.test.js

import { render, screen, waitFor } from '@testing-library/react';

import App from '../App';
import React from 'react';

describe('<App /> component', () => {
    test('shows list of events', async () => {
        const { container } = render(<App />);
        await waitFor(() => {
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            expect(container.querySelector('#event-list')).toBeInTheDocument();
        });
    });
    test('shows CitySearch input', async () => {
        const { container } = render(<App />);
        await waitFor(() => {
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            expect(container.querySelector('#city-search')).toBeInTheDocument();
        });
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