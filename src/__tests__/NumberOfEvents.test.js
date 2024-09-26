// src/__tests__/NumberOfEvents.test.js

import React, { act } from 'react';
import { render, screen } from '@testing-library/react';
import NumberOfEvents from '../components/NumberOfEvents';
import userEvent from '@testing-library/user-event';

describe('<NumberOfEvents /> component', () => {
    const numberOfEvents = 10;
    const setNumberOfEvents = jest.fn();
    test('has a input element with "number" type', () => {
        render(<NumberOfEvents updateEvents={(e) => setNumberOfEvents} />);
        expect(screen.getByLabelText('Events on page:')).toHaveProperty('type', 'number');
    });
    test('has a default value of 32', () => {
        render(<NumberOfEvents updateEvents={(e) => setNumberOfEvents} />);
        const numberOfEventsInput = screen.getByLabelText('Events on page:');
        expect(numberOfEventsInput).toHaveValue(32);
    });
    test('has correct value after input', async () => {
        render(<NumberOfEvents updateEvents={(e) => setNumberOfEvents} />);
        const numberOfEventsInput = screen.getByLabelText('Events on page:');
        expect(numberOfEventsInput).toBeInTheDocument();
        expect(screen.getByLabelText('Events on page:')).toHaveProperty('type', 'number');
        const user = userEvent.setup();
        await act(async () => {
            await user.clear(numberOfEventsInput);
            await user.type(numberOfEventsInput, numberOfEvents.toString());
        });
        expect(numberOfEventsInput).toHaveValue(numberOfEvents);
    });
});