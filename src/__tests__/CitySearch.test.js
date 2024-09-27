// src/__tests__/CitySearch.test.js

import { act } from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitySearch from '../components/CitySearch';
import { extractLocations, getEvents } from '../api';
import App from '../App';

describe('<CitySearch /> component', () => {
    test('has text input', () => {
        render(<CitySearch />);
        const cityTextBox = screen.queryByRole('textbox');
        expect(cityTextBox).toBeInTheDocument();
    });
    test('has a city dropdown that is hidden by default', () => {
        render(<CitySearch />);
        const suggestionInput = screen.queryByRole('button');
        expect(suggestionInput).toHaveAttribute('aria-expanded', 'false');
    });
    test('shows a dropdown of all cities when city textbox gains focus', async () => {
        const allLocations = extractLocations(await getEvents());
        render(<CitySearch allLocations={allLocations} />);
        const user = userEvent.setup();
        const suggestionInput = screen.queryByRole('button');
        expect(suggestionInput).toHaveAttribute('aria-expanded', 'false');
        const cityTextBox = screen.getByPlaceholderText('Search for a city');
        await act(async () => await user.click(cityTextBox));
        expect(suggestionInput).toHaveAttribute('aria-expanded', 'true');
        let cityListItems = screen.queryAllByRole('listitem');
        expect(cityListItems).toHaveLength(allLocations.length + 1);
        expect(screen.queryByText('No city found')).not.toBeInTheDocument();
    });
    test('updates list of suggested cities correctly when user types in city textbox', async () => {
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
        expect(screen.queryByText('No city found')).not.toBeInTheDocument();
    });
    test('sets the correct value of the city textbox when user clicks on a city', async () => {
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
    test('hides the city dropdown when user clicks on a city', async () => {
        render(<CitySearch allLocations={extractLocations(await getEvents())} />);
        const user = userEvent.setup();
        const cityTextBox = screen.queryByRole('textbox');
        await act(async () => await user.type(cityTextBox, 'Berlin'));
        const BerlinGermanySuggestion = screen.queryAllByRole('listitem')[0];
        await act(async () => await user.click(BerlinGermanySuggestion));
        const suggestionInput = screen.queryByRole('button');
        expect(suggestionInput).toHaveAttribute('aria-expanded', 'false');
    });
    test('hides the city dropdown when the city textbox has no value', async () => {
        render(<CitySearch allLocations={extractLocations(await getEvents())} />);
        const user = userEvent.setup();
        const cityTextBox = screen.queryByRole('textbox');
        await act(async () => await user.type(cityTextBox, 'Berlin'));
        const suggestionInput = screen.queryByRole('button');
        expect(suggestionInput).toHaveAttribute('aria-expanded', 'true');
        await act(async () => await user.clear(cityTextBox));
        expect(suggestionInput).toHaveAttribute('aria-expanded', 'false');
    });
    test('shows all cities in the city dropdown when the user clicks on the "See all cities" option', async () => {
        const allLocations = extractLocations(await getEvents());
        render(<CitySearch allLocations={allLocations} />);
        const user = userEvent.setup();
        await act(async () => await user.type(screen.getByRole('textbox'), 'Berlin'));
        await act(async () => await user.click(screen.getAllByRole('listitem').pop()));
        for (let location of allLocations) {
            expect(screen.getAllByRole('listitem').map(item => item.textContent)).toContain(location);
        }
    });
    test('show disabled "No city found" when no city matches the user input', async () => {
        render(<CitySearch allLocations={extractLocations(await getEvents())} />);
        const user = userEvent.setup();
        await act(async () => await user.type(screen.getByRole('textbox'), 'Hamburg'));
        const noCityItem = screen.getAllByRole('listitem')[0];
        expect(noCityItem).toHaveTextContent('No city found');
        expect(noCityItem).toHaveClass('disabled');
        expect(screen.getByText('See all cities')).toBeInTheDocument();
    });
});

describe('<CitySearch /> integration', () => {
    test('renders suggestions list when the app is rendered', async () => {
        render(<App />);
        const user = userEvent.setup();
        let citySearchList;
        await waitFor(() => {
            citySearchList = screen.getAllByRole('list')[0];
        });
        expect(citySearchList).toHaveClass('no-caret nav-item dropdown');
        const cityTextBox = within(citySearchList).getByRole('textbox');
        await act(async () => await user.click(cityTextBox));
        expect(within(citySearchList)
            .queryAllByRole('listitem'))
            .toHaveLength(extractLocations(await getEvents()).length + 1);
    });
});