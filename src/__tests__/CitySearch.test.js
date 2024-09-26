// src/__tests__/CitySearch.test.js

import { act } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitySearch from '../components/CitySearch';
import { extractLocations, getEvents } from '../api';

describe('<CitySearch /> component', () => {
    test('renders text input', () => {
        render(<CitySearch />);
        const cityTextBox = screen.queryByRole('textbox');
        expect(cityTextBox).toBeInTheDocument();
    });
    test('suggestions list is hidden by default', () => {
        render(<CitySearch />);
        const suggestionInput = screen.queryByRole('button');
        expect(suggestionInput).toHaveAttribute('aria-expanded', 'false');
    });
    test('renders a list of suggestions when city textbox gains focus', async () => {
        render(<CitySearch />);
        const user = userEvent.setup();
        const suggestionInput = screen.queryByRole('button');
        expect(suggestionInput).toHaveAttribute('aria-expanded', 'false');
        const cityTextBox = screen.getByPlaceholderText('Search for a city');
        await act(async () => await user.click(cityTextBox));
        expect(suggestionInput).toHaveAttribute('aria-expanded', 'true');
    });
    test('updates list of suggestions correctly when user types in city textbox', async () => {
        const user = userEvent.setup();
        const allEvents = await getEvents();
        const allLocations = extractLocations(allEvents);
        render(<CitySearch allLocations={allLocations} />);
        const cityTextBox = screen.queryByRole('textbox');
        await act(async () => await user.type(cityTextBox, 'Berlin'));
        const suggestions = allLocations ? allLocations.filter(location => location.toUpperCase().indexOf(cityTextBox.value.toUpperCase()) > -1) : [];
        const suggestionListItems = screen.queryAllByRole('listitem');
        expect(suggestionListItems).toHaveLength(suggestions.length + 1);
        for (let i = 0; i < suggestions.length; i++) {
            expect(suggestionListItems[i]).toHaveTextContent(suggestions[i]);
        }
    });
    test('renders the suggestion text in the textbox when user clicks on a suggestion', async () => {
        const user = userEvent.setup();
        const allEvents = await getEvents();
        const allLocations = extractLocations(allEvents);
        render(<CitySearch allLocations={allLocations} />);
        const cityTextBox = screen.queryByRole('textbox');
        await act(async () => await user.type(cityTextBox, 'Berlin'));
        const BerlinGermanySuggestion = screen.queryAllByRole('listitem')[0];
        await act(async () => await user.click(BerlinGermanySuggestion));
        expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
    });
});