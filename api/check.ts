import type { VercelRequest, VercelResponse } from '@vercel/node';

const FormData = require('form-data');
const moment = require('moment/moment');
const fetch = require('node-fetch');

export default async (req: VercelRequest, res: VercelResponse) => {
  const { fn, i, fp, n, s, t } = req.body;

  const formData = new FormData();
  formData.append('fn', fn);
  formData.append('fd', i);
  formData.append('fp', fp);
  formData.append('n', n);
  formData.append('s', s);
  formData.append('t', moment(t).format('DD.MM.YYYY HH:ss'));
  formData.append('qr', '0');

  const response = await fetch(process.env.NG_APP_OFD_AGGREGATOR_URL, {
    method: 'POST',
    body: formData,
    headers: {
      Accept: '*/*',
      Host: process.env.NG_APP_OFD_AGGREGATOR_HOST,
    },
  });

  const { data } = await response.json();

  if (!data?.json) {
    console.log(`Response failed with error ${JSON.stringify(data)}`);

    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(data));
    res.end();
  }

  const { user, totalSum, dateTime: date, retailPlace, retailPlaceAddress, items } = data.json;

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
