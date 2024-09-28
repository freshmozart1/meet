// src/__tests__/NumberOfEvents.test.js

import React, { act } from 'react';
import { render, screen } from '@testing-library/react';
import NumberOfEvents from '../components/NumberOfEvents';
import userEvent from '@testing-library/user-event';

describe('<NumberOfEvents /> component', () => {
    const setCurrentNOE = jest.fn();
    test('has a label element with text "Events on page:"', () => {
        render(<NumberOfEvents setCurrentNOE={(e) => setCurrentNOE} />);
        expect(screen.getByLabelText('Events on page:')).toBeInTheDocument();
    });
    test('has a input element with "number" type', () => {
        render(<NumberOfEvents setCurrentNOE={(e) => setCurrentNOE} />);
        expect(screen.getByLabelText('Events on page:')).toHaveAttribute('type', 'number');
    });
    test('has a default value of 32', async () => {
        render(<NumberOfEvents setCurrentNOE={(e) => setCurrentNOE} defaultValue={32} />);
        expect(screen.getByLabelText('Events on page:')).toHaveValue(32);
    });
    test('has correct value after input', async () => {
        render(<NumberOfEvents setCurrentNOE={(e) => setCurrentNOE} />);
        const numberOfEventsInput = screen.getByLabelText('Events on page:');
        const user = userEvent.setup();
        const numberOfEvents = 10;
        await act(async () => {
            await user.clear(numberOfEventsInput);
            await user.type(numberOfEventsInput, numberOfEvents.toString());
        });
        expect(numberOfEventsInput).toHaveValue(numberOfEvents);
    });
});