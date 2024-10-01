import { render, screen, waitFor, within } from "@testing-library/react";
import { loadFeature, defineFeature } from "jest-cucumber";
import userEvent from "@testing-library/user-event";
import App from "../App";
import React from "react";

const feature = loadFeature("./src/features/filterEventsByCity.feature");

defineFeature(feature, test => {
    test('When User hasn\'t searched for a city, show upcoming events from all cities.', ({ given, when, then }) => {
        given('User hasn’t searched for any city', () => { });
        when('the user opens the app', () => {
            render(<App />);
        });
        then('the user should see a list of all upcoming events', async () => {

            let eventList;
            let eventListItems = [];
            await waitFor(() => {
                eventList = screen.getAllByRole('list')[1];
            });
            expect(eventList).toHaveAttribute('id', 'event-list');
            await waitFor(() => {
                eventListItems = within(eventList).getAllByRole('listitem');
            });
            expect(eventListItems.length).toBe(32);
        });
    });

    test('User should see a list of suggestions when they search for a city.', ({ given, when, then }) => {
        given('the main page is open', () => {
            render(<App />);
        });

        when('user starts typing in the city textbox', async () => {
            const user = userEvent.setup();
            let citySearchInput;
            await waitFor(() => {
                citySearchInput = screen.getByPlaceholderText('Search for a city');
            })
            await user.type(citySearchInput, 'Berlin');
        });
        then('the user should see a list of cities (suggestions) that match what they’ve typed', async () => {
            let citySearchList, citySearchListItems;
            await waitFor(() => {

                citySearchList = screen.queryAllByRole('list')[0];
            });
            expect(citySearchList).toHaveClass('no-caret nav-item dropdown');
            citySearchListItems = within(citySearchList).queryAllByRole('listitem');
            expect(citySearchListItems.length).toBe(2); // 2 because of the 'See all Cities' item
        });
    });

    test('User can select a city from the suggested list.', ({ given, and, when, then }) => {
        given(/^user was typing "(.*)" in the city textbox$/, async (cityName) => {
            render(<App />);
            const user = userEvent.setup();
            let citySearchInput;
            await waitFor(() => {
                citySearchInput = screen.getByPlaceholderText('Search for a city');
            })
            await user.type(citySearchInput, cityName);
        });
        let citySearchList;
        and('the list of suggested cities is showing', () => {
            citySearchList = screen.queryAllByRole('list')[0];
            expect(citySearchList).toHaveClass('no-caret nav-item show dropdown');
        });

        when(/^the user selects a city \(e.g., "(.*)"\) from the list$/, async (cityName) => {
            const user = userEvent.setup();
            const citySearchListItems = within(citySearchList).queryAllByRole('listitem');
            const citySelected = citySearchListItems.find(item => item.textContent === cityName);
            await user.click(citySelected);
        });

        then(/^their city should be changed to "(.*)"$/, (cityName) => {
            const citySearchInput = screen.getByPlaceholderText('Search for a city');
            expect(citySearchInput).toHaveValue(cityName);
        });

        and(/^the user should receive a list of upcoming events in "(.*)"$/, (cityName) => {
            const eventList = screen.getAllByRole('list')[1];
            expect(eventList).toHaveAttribute('id', 'event-list');
            const eventListItems = within(eventList).getAllByRole('listitem');
            for (let item of eventListItems) {
                expect(item).toHaveTextContent(cityName);
            }
        });
    });
});