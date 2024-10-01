// src/features/showHideAnEventsDetails.test.js

import { render, screen, waitFor, within } from "@testing-library/react";
import { loadFeature, defineFeature } from "jest-cucumber";
import userEvent from "@testing-library/user-event";
import App from "../App";
import React from "react";

defineFeature(loadFeature('./src/features/showHideAnEventsDetails.feature'), test => {
    test('A user wants to view more details about an event.', ({ given, when, then }) => {
        let eventButton;
        given('the user hasn\'t opened the event details', async () => {
            render(<App />);
            let eventList, eventListItems = [];
            await waitFor(() => {
                eventList = screen.getAllByRole('list')[1];
            });
            expect(eventList).toHaveAttribute('id', 'event-list');
            await waitFor(() => {
                eventListItems = within(eventList).getAllByRole('listitem');
            });
            expect(eventListItems.length).toBeGreaterThan(0); // Sicherstellen, dass es mindestens ein Event gibt
            for (let item of eventListItems) {
                expect(within(item).getByRole('button')).toHaveAttribute('aria-expanded', 'false');
            }
            eventButton = within(eventListItems[0]).getByRole('button');
        });

        when('the user clicks on the event', async () => {
            await userEvent.click(eventButton);
        });

        then('the user should see the event details', () => {
            expect(eventButton).toHaveAttribute('aria-expanded', 'true');
        });
    });
    test('A user wants to hide the details of an event.', ({ given, when, then }) => {
        let eventButton;
        given('the user has opened the event details', async () => {
            render(<App />);
            let eventList, eventListItems = [];
            await waitFor(() => {
                eventList = screen.getAllByRole('list')[1];
            });
            expect(eventList).toHaveAttribute('id', 'event-list');
            await waitFor(() => {
                eventListItems = within(eventList).getAllByRole('listitem');
            });
            expect(eventListItems.length).toBeGreaterThan(0); // Sicherstellen, dass es mindestens ein Event gibt
            eventButton = within(eventListItems[0]).getByRole('button');
            await userEvent.click(eventButton);
            expect(eventButton).toHaveAttribute('aria-expanded', 'true');
        });

        when('the user clicks on the event', async () => {
            await userEvent.click(eventButton);
        });

        then('the user should not see the event details', () => {
            expect(eventButton).toHaveAttribute('aria-expanded', 'false');
        });
    });
});