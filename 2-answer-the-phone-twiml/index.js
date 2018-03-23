/* jshint esversion: 6 */

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.type('text/xml');
  res.send(`
    <Response>
        <Say voice="woman">Hello world!</Say>
    </Response>
  `);
});

app.listen(3000, () => {
  console.log('App listening at http://localhost:3000.');
});