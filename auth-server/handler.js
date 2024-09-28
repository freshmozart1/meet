import { google } from 'googleapis';

const calendar = google.calendar('v3');
const SCOPES = ['https://www.googleapis.com/auth/calendar.events.public.readonly'];
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID, REDIRECT_URI } = process.env;
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

export async function getAuthURL() {
  const body = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: body
  };
};

export async function getAccessToken(event) {
  const code = decodeURIComponent(`${event.pathParameters.code}`);
  return new Promise((resolve, reject) => {
    oAuth2Client.getToken(code, (error, response) => {
      if (error) return reject(error);
      return resolve(response);
    });
  }).then((results) => {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify(results)
    };
  }).catch((error) => {
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    };
  });
}

export async function getCalendarEvents(event) {
  const access_token = decodeURIComponent(`${event.pathParameters.access_token}`);
  oAuth2Client.setCredentials({ access_token });
  return new Promise((resolve, reject) => {
    calendar.events.list({
      calendarId: CALENDAR_ID,
      auth: oAuth2Client,
      timeMin: new Date().toISOString(),
      singleEvents: true,
      orderBy: 'startTime'
    }, (error, response) => {
      if (error) return reject(error);
      return resolve(response);
    });
  }).then((results) => {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify(results.data.items)
    };
  }).catch((error) => {
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    };
  });
}