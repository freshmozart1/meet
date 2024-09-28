import mockEvents from "./mock-data";

export const checkToken = async (accessToken) => {
    const response = await fetch('https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=' + accessToken);
    return await response.json();
};

export const getToken = async (code) => {
    const response = await fetch('https://540vqkhysf.execute-api.eu-central-1.amazonaws.com/dev/api/token/' + encodeURIComponent(code));
    const { access_token } = await response.json();
    access_token && localStorage.setItem('access_token', access_token);
    return access_token;
};

export const getAccessToken = async () => {
    const accessToken = localStorage.getItem('access_token');
    const tokenCheck = accessToken && (await checkToken(accessToken));
    if (!accessToken || tokenCheck.error) {
        await localStorage.removeItem('access_token');
        const searchParams = new URLSearchParams(window.location.search);
        const code = await searchParams.get('code');
        if (!code) {
            let response;
            try {
                response = await fetch('https://540vqkhysf.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url');
                if (!response.ok) {
                    throw new Error('Network response was not ok' + response);
                }
            } catch (error) {
                console.error(error);
                return;
            }
            return window.open(await response.text(), '_self');
        }
        return code && getToken(code);
    }
    return accessToken;
};

const removeQuery = () => {
    let newUrl;
    if (window.history.pushState && window.location.pathname) {
        newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname;
        window.history.pushState('', '', newUrl);
    } else {
        newUrl = window.location.protocol + '//' + window.location.host;
        window.history.pushState('', '', newUrl);
    }
};

export const extractLocations = (events) => {
    return [...new Set(events.map(event => event.location))];
};

export const getEvents = async () => {
    /*if (window.location.href.startsWith('http://localhost')) {
        return mockEvents;
    }*/
    const token = await getAccessToken();
    removeQuery();
    const response = await fetch('https://540vqkhysf.execute-api.eu-central-1.amazonaws.com/dev/api/get-events/' + token);
    const result = await response.json();
    console.log(result);
    if (result) { return result.events; } else return null;
}