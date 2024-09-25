// src/__tests__/Event.test.js

import { render, screen } from '@testing-library/react';
import Event from '../components/Event';
import { getEvents } from '../api';
import { Accordion, AccordionItem } from 'react-bootstrap';
import userEvent from '@testing-library/user-event';
import { act } from 'react';

describe('<Event /> component', () => {
    let mockEvent;
    beforeAll(async () => {
        mockEvent = (await getEvents())[0];
    });
    test('renders event summary', () => {
        render(
            <Accordion role='list' id='event-list'>
                <Event event={mockEvent} as={AccordionItem} />
            </Accordion>
        );
        expect(screen.getByText(mockEvent.summary)).toBeInTheDocument();
    });
    test('renders event start date and time', () => {
        render(
            <Accordion role='list' id='event-list'>
                <Event event={mockEvent} as={AccordionItem} />
            </Accordion>
        );
        expect(screen.getByText(mockEvent.start.dateTime)).toBeInTheDocument();
    });
    test('renders event location', () => {
        render(
            <Accordion role='list' id='event-list'>
                <Event event={mockEvent} as={AccordionItem} />
            </Accordion>
        );
        expect(screen.getByText(mockEvent.location)).toBeInTheDocument();
    });
    test('renders event description if event expanded', async () => {
        render(
            <Accordion role='list' id='event-list'>
                <Event event={mockEvent} as={AccordionItem} />
            </Accordion>
        );
        const accordionButton = screen.getByRole('button');
        expect(accordionButton).toHaveAttribute('aria-expanded', 'false');
        const user = userEvent.setup();
        await act(async () => {
            await user.click(accordionButton);
        });
        expect(accordionButton).toHaveAttribute('aria-expanded', 'true');
        expect(screen.getByText(mockEvent.description.replace(/\n/g, ''))).toBeInTheDocument();
        await act(async () => {
            await user.click(accordionButton);
        });
        expect(accordionButton).toHaveAttribute('aria-expanded', 'false');
    });
});