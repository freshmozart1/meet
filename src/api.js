import mockData from "./mock-data";

export const extractLocations = (events) => {
    return [...new Set(events.map(event => event.location))];
};

export const getEvents = async () => {
    return mockData;
}