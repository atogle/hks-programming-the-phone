/* jshint esversion: 6 */

const express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const app = express();

app.get('/', (req, res) => {
  const twiml = new VoiceResponse();

  twiml.say(
    {
      voice: 'woman',
    },
    'Hello world!'
  );

  res.type('text/xml');
  res.send(twiml.toString());
});

app.listen(3000, () => {
  console.log('App listening at http://localhost:3000.');
});