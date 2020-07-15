const { promisify } = require("util");

const debug = require('debug')('app');
const express = require('express');
const fetch = require('node-fetch');
const redis = require('redis');

// Create Express server
const host = '0.0.0.0';
const port = 3001;
const app = express();

// Create redis client
const redisClient = redis.createClient('redis://redis')
const redisGet = promisify(redisClient.get).bind(redisClient);
const redisSetEx = promisify(redisClient.setex).bind(redisClient);

// Format the URL with the key and given offset
function legAPI(path, offset = '0') {
  return `https://legislation.nysenate.gov/${path}?key=${process.env.OPEN_LEGISLATION_KEY}&offset=${offset}&limit=1000`
}

// Endpoint to get all the years in a bill
app.get('/api/v1/bills/:year', async (req, res) => {
  let allBills;
  const cachedBills = await redisGet(req.originalUrl);

  if (cachedBills) {
    allBills = JSON.parse(cachedBills);
  } else {
    // First request with no offset
    let firstResponse = await fetch(legAPI(`/api/3/bills/${req.params.year}`));
    let firstResponseData = await firstResponse.json();
    allBills = firstResponseData.result.items;

    // Retrieve the remaining pages
    const totalPages = Math.ceil(firstResponseData.total / 1000);
    for (let i = 1; i < totalPages; i++) {
      let offsetStart = (i * 1000) + 1;
      let nextResponse = await fetch(legAPI(`/api/3/bills/${req.params.year}`, offsetStart));
      let nextResponseData = await nextResponse.json();
      allBills = allBills.concat(nextResponseData.result.items);
    }

    // Cache the result for 10 minutes
    await redisSetEx(req.originalUrl, 600, JSON.stringify(allBills))
  }

  res.json(allBills);
});

// Endpoint to get a single bill
app.get('/api/v1/bills/:year/:printNumber', async (req, res) => {
  let apiResponse = await fetch(legAPI(`/api/3/bills/${req.params.year}/${req.params.printNumber}`));
  res.json(await apiResponse.json());
});

// Listen
app.listen(port, host, () => console.log(`Example app listening at http://${host}:${port}`));
