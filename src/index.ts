import bodyParser from 'body-parser';
import express from 'express';
import { nanoid } from 'nanoid';

import { isValidUrl } from './utils';

const app = express();

const db = new Map<string,
  { originalUrl: string; shortUrl: string; nbClicks: number }>();

async function bootstrap() {
  app.use(bodyParser.json());

  app.get('/api/shorturl/analytics', async (req, res) => {
    return res.send(Array.from(db, ([, value]) => value));
  });


  app.get('/api/shorturl/:shortUrl', async (req, res) => {
    const urlData = db.get(req.params.shortUrl);

    if (!urlData) {
      return res.sendStatus(404);
    }

    urlData.nbClicks++;
    db.set(req.params.shortUrl, urlData);

    return res.redirect(urlData.originalUrl);
  });

  app.post('/api/shorturl/', async (req, res) => {
    if (!isValidUrl(req.body.url)) {
      return res.status(400).send('Invalid URL format');
    }

    const shortUrl = nanoid(6);

    const data = { originalUrl: req.body.url, shortUrl, nbClicks: 0 };

    db.set(shortUrl, data);

    return res.send(data);
  });

  await app.listen('3000', () => {
    console.log('Server is running on port 3000');
  });
}

bootstrap();
