// src/__tests__/App.test.js

import { render } from '@testing-library/react';

import App from '../App';

describe('<App /> component', () => {
    test('renders list of events', () => {
        // eslint-disable-next-line testing-library/no-node-access
        expect(render(<App />).container.querySelector('#event-list')).toBeInTheDocument();
    });
    test('render CitySearch', () => {
        // eslint-disable-next-line testing-library/no-node-access
        expect(render(<App />).container.querySelector('#city-search')).toBeInTheDocument();
    });
});