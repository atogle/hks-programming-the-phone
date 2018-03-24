/* jshint esversion: 6 */

const express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const app = express();

const REP_NAME = 'Aaron Ogle';

app.get('/', (req, res) => {
  const twiml = new VoiceResponse();

  twiml.say(
    {
      voice: 'woman',
    },
    `Thank you for calling the office of Representative ${REP_NAME}.
    The office is currently closed. Your opinion is very important, so please stay on the line to leave a message.
    I will now ask your name and zip code so that I have everything I need to properly record your message.`
  );

  res.type('text/xml');
  res.send(twiml.toString());
});

app.listen(3000, () => {
  console.log('App listening at http://localhost:3000.');
});