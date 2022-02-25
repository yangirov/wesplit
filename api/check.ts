import type { VercelRequest, VercelResponse } from '@vercel/node';

const FormData = require('form-data');
const moment = require('moment/moment');
const fetch = require('node-fetch');
const firebaseAdmin = require('firebase-admin');

const serviceAccount = {
  type: 'service_account',
  project_id: process.env.NG_APP_FIREBASE_PROJECT_ID,
  private_key_id: process.env.NG_APP_FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.NG_APP_FIREBASE_PRIVATE_KEY,
  client_email: process.env.NG_APP_FIREBASE_CLIENT_EMAIL,
  client_id: process.env.NG_APP_FIREBASE_CLIENT_ID,
  client_x509_cert_url: process.env.NG_APP_FIREBASE_CLIENT_CERT_URL,
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
};

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

const verifyToken = async (idToken: string | undefined) => {
  if (idToken && idToken.length) {
    const newToken = idToken.replace('Bearer ', '');

    let header = await firebaseAdmin
      .auth()
      .verifyIdToken(newToken)
      .then(function (decodedToken: any) {
        return {
          Authorization: 'Bearer ' + decodedToken,
        };
      })
      .catch((error: any) => {
        console.log({ error });
        return null;
      });

    return header;
  } else {
    return false;
  }
};

export default async (req: VercelRequest, res: VercelResponse) => {
  const verified = await verifyToken(req.headers.authorization);

  if (!verified) {
    if (!req.query?.questMode) {
      console.log('No access ');

      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify({ error: 'No access' }));
      res.end();
      return;
    }
  }

  const { fn, i, fp, n, s, t } = req.body;

  const formData = new FormData();
  formData.append('fn', fn);
  formData.append('fd', i);
  formData.append('fp', fp);
  formData.append('n', n);
  formData.append('s', s);
  formData.append('t', moment(t).format('DD.MM.YYYY HH:ss'));
  formData.append('qr', '0');

  const response = await fetch('https://proverkacheka.com/example/check.php', {
    method: 'POST',
    body: formData,
    headers: {
      Accept: '*/*',
      Host: 'proverkacheka.com',
    },
  });

  const { data } = await response.json();

  if (!data?.json) {
    console.log(`Response failed with error ${JSON.stringify(data)}`);

    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(data));
    res.end();
  }

  const {
    user,
    totalSum,
    dateTime: date,
    retailPlace,
    retailPlaceAddress,
    items,
  } = data.json;

  const result = {
    user,
    totalSum: totalSum / 100,
    date,
    retailPlace,
    retailPlaceAddress,
    items: items?.map((x: any) => ({
      name: x.name.replace(/\s\s+/g, ' '),
      price: x.price / 100,
      sum: x.sum / 100,
      quantity: x.quantity,
    })),
  };

  console.log(`Success response with params ${JSON.stringify(req.body)}`);

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify(result));
  res.end();
};
