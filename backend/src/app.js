const express = require('express');
const fetch = require('node-fetch');

const host = '0.0.0.0';
const port = 3001;
const app = express();

function legAPI(path) {
  return `https://legislation.nysenate.gov/${path}?key=${process.env.OPEN_LEGISLATION_KEY}&limit=1000`
}

app.get('/api/v1/bills/:year', async (req, res) => {
  let apiResponse = await fetch(legAPI(`/api/3/bills/${req.params.year}`));
  res.json(await apiResponse.json());
});

app.get('/api/v1/bills/:year/:printNumber', async (req, res) => {
  let apiResponse = await fetch(legAPI(`/api/3/bills/${req.params.year}/${req.params.printNumber}`));
  res.json(await apiResponse.json());
});

app.listen(port, host, () => console.log(`Example app listening at http://${host}:${port}`));
