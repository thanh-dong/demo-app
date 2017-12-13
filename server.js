const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8088;
const fs = require('fs')

import Store from './src/store';
import { categories } from './src/components/Customer/categories';
import { data } from './src/components/Customer/data';
import _ from 'lodash'

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', function (request, response) {
  response.sendFile(__dirname + '/dist/index.html');
});

app.get('/insights/:phone', (req, res) => {
  var chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
  var email = '';
  for(var ii=0; ii<15; ii++){
    email += chars[Math.floor(Math.random() * chars.length)];
  }
  
  const data = { number: req.params.phone, insights: _.sampleSize(categories, 3), email: email + '@example.com'};
  _.filter(data, (item) => {
    _.map(item.insights, (i) => i.name)
  })

  fs.appendFile('insight.json',
    JSON.stringify(data) + '/n',
    (err) => {
      res.send('successfully registered');
    }
  );
});

app.get('/getinsights', (req, res) => {
  fs.readFile('insight.json', 'utf8', function read(err, data) {
    if (err) {
      throw err;
    }
    const item = _.map(_.compact(_.split(data, '/n')), JSON.parse)
    res.send(item);
  });
});

app.listen(PORT, error => (
  error
    ? console.error(error)
    : console.info(`Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`)
));
