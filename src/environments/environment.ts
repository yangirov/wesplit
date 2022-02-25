export const environment = {
  name: 'WeSplit Test',
  domain: 'localhost',
  production: false,
  checklyhq: {
    url: 'https://api.checklyhq.com/v1/check-statuses',
    checkId: process.env.NG_APP_CHECKLYHQ_ID,
    token: process.env.NG_APP_CHECKLYHQ_TOKEN,
    accountId: process.env.NG_APP_CHECKLYHQ_ACCOUNT,
  },
  firebase: {
    apiKey: process.env.NG_APP_FIREBASE_API_KEY,
    authDomain: process.env.NG_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NG_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NG_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NG_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NG_APP_FIREBASE_MESSAGING_APP_ID,
  },
};
