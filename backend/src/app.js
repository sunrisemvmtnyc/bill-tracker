const express = require('express');
const fetch = require('node-fetch');

const host = '0.0.0.0';
const port = 3001;

const app = express();

function billURL(year, printNumber) {
  return `https://legislation.nysenate.gov/api/3/bills/${year}/${printNumber}?key=${process.env.OPEN_LEGISLATION_KEY}`
}

app.get('/api/v1/bill/:year/:printNumber', async (req, res) => {
  let apiResponse = await fetch(billURL(req.params.year, req.params.printNumber));
  res.json(await apiResponse.json());
});

app.listen(port, host, () => console.log(`Example app listening at http://${host}:${port}`));
