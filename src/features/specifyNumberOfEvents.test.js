// src/features/specifyNumberOfEvents.test.js

import { render, screen, waitFor, within } from "@testing-library/react";
import { loadFeature, defineFeature } from "jest-cucumber";
import userEvent from "@testing-library/user-event";
import App from "../App";
import React from "react";

defineFeature(loadFeature('./src/features/specifyNumberOfEvents.feature'), test => {
    test('The default number of events is 32', ({ given, when, then }) => {
        let eventList;
        given('the user hasn\'t specified a number of events', () => { });

        when('the user opens the app', async () => {
            render(<App />);
            await waitFor(() => {
                eventList = screen.getAllByRole('list')[1];
            });
        });

        then(/^the user should see a list of (\d+) events$/, (arg0) => {
            expect(eventList).toHaveAttribute('id', 'event-list');
            expect(within(eventList).getAllByRole('listitem')).toHaveLength(32);
        });
    });
    test('User can change the number of events they want to see', ({ given, when, then }) => {
        let numberOfEventsInput;
        given('the user has opened the app', async () => {
            render(<App />);
            await waitFor(() => {
                numberOfEventsInput = screen.getByLabelText('Events on page:');
            });
        });

        when('the user specifies the number of events they want to see', async () => {
            await userEvent.clear(numberOfEventsInput);
            await userEvent.type(numberOfEventsInput, '10');
        });

        then('the user should see a list of the specified number of events', () => {
            const eventList = screen.getAllByRole('list')[1];
            expect(eventList).toHaveAttribute('id', 'event-list');
            expect(within(eventList).getAllByRole('listitem')).toHaveLength(10);
        });
    });
});