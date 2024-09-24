// src/__tests__/App.test.js

import { render } from '@testing-library/react';

import App from '../App';
import { act } from 'react';

describe('<App /> component', () => {
    test('renders list of events', async () => {
        const { container } = render(<App />);
        await act(async () => {
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            expect(container.querySelector('#event-list')).toBeInTheDocument();
        });
    });
    test('render CitySearch', async () => {
        const { container } = render(<App />);
        await act(async () => {
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            expect(container.querySelector('#city-search')).toBeInTheDocument();
        });
    });
});