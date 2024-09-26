// src/__tests__/App.test.js

import { render, screen, waitFor } from '@testing-library/react';

import App from '../App';
import React, { act } from 'react';
import userEvent from '@testing-library/user-event';

describe('<App /> component', () => {
    test('renders list of events', async () => {
        const { container } = render(<App />);
        await waitFor(() => {
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            expect(container.querySelector('#event-list')).toBeInTheDocument();
        });
    });
    test('render CitySearch', async () => {
        const { container } = render(<App />);
        await waitFor(() => {
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            expect(container.querySelector('#city-search')).toBeInTheDocument();
        });
    });
    test('render NumberOfEvents', async () => {
        const { container } = render(<App />);
        await waitFor(() => {
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            expect(container.querySelector('#numberOfEvents')).toBeInTheDocument();
        });
    });
    test('show 32 events by default', async () => {
        const { container } = render(<App />);
        await waitFor(() => {
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            expect(container.querySelector('#event-list').children.length).toBe(32);
        });
    });
    test('render correct number of events', async () => {
        const { container } = render(<App />);
        const user = userEvent.setup();
        await waitFor(() => {
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            expect(container.querySelector('#numberOfEvents')).toBeInTheDocument();
        });
        await waitFor(() => {
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            expect(container.querySelector('#event-list')).toBeInTheDocument();
        });
        const numberOfEventsInput = screen.getByLabelText('Events on page:');
        expect(numberOfEventsInput).toHaveValue(32);
        await act(async () => {
            await user.clear(numberOfEventsInput);
            await user.type(numberOfEventsInput, '10');
        });
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        expect(container.querySelector('#event-list').children.length).toBe(10);
    });
});