const functions = require("firebase-functions");
const admin = require("firebase-admin");
const https = require("https");
const dayjs = require("dayjs");
import FormData = require("form-data");
const serviceAccount = require("./serviceAccountKey.json");

import * as cors from "cors";
const corsHandler = cors({ origin: true });

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function verifyToken(idToken: string) {
  if (idToken) {
    const newToken = idToken.replace("Bearer ", "");

    let header = await admin.auth().verifyIdToken(newToken)
      .then(function(decodedToken: any) {
        return {
          "Authorization": 'Bearer ' + decodedToken
        }
      }).catch((error: any) => {
        console.log({ error })
        return null;
      });

    return header;
  } else {
    return false;
  }
}

exports.check = functions.https.onRequest(async (req: any, res: any) => {
  corsHandler(req, res, async () => {
    const verified = await verifyToken(req.headers.authorization);

    if (!verified) {
      res.writeHead(500, {"Content-Type": "application/json"});
      res.write(JSON.stringify({error: "No access"}));
      res.end();
    }

    const {fn, i: fd, fp, n, s, t} = req.body;

    const formData = new FormData();
    formData.append("fn", fn);
    formData.append("fd", fd);
    formData.append("fp", fp);
    formData.append("n", n);
    formData.append("s", s);
    formData.append("t", dayjs(t).format(t, "DD.MM.YYYY HH:ss"));
    formData.append("qr", 0);

    const options = {
      hostname: "proverkacheka.com",
      port: 443,
      path: "/example/check.php",
      method: "POST",
      headers: {
        ...formData.getHeaders(),
        "Content-Length": formData.getLengthSync(),
        "Accept": "*/*",
        "Host": "proverkacheka.com",
      },
      rejectUnauthorized: false
    }

    const checkReq = https.request(options, (r: any) => {
      let data: string = "";

      r.on("data", (d: any) => {
        data += d;
      });

      r.on("end", () => {
        const obj = JSON.parse(data);
        const {user, totalSum, dateTime: date, retailPlace, retailPlaceAddress, items} = obj.data.json;

        const result = {
          user,
          totalSum: totalSum / 100,
          date,
          retailPlace,
          retailPlaceAddress,
          items: items?.map((x: any) => ({
            name: x.name.replace(/\s\s+/g, " "),
            price: x.price / 100,
            sum: x.sum / 100,
            quantity: x.quantity
          })),
        }

        res.writeHead(200, {"Content-Type": "application/json"});
        res.write(JSON.stringify(result));
        res.end();
      });
    });

    formData.pipe(checkReq);
  });
});
