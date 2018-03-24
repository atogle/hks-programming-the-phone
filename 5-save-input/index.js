/* jshint esversion: 6 */

const express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const app = express();

const REP_NAME = 'Aaron Ogle';

app.use((req, res, next) => {
  req.callState = JSON.parse(req.query.state || '{}');
  next();
});

const addCallState = (url, callState) => {
  return `${url}?state=${encodeURI(JSON.stringify(callState))}`;
};

app.get('/welcome', (req, res) => {
  const twiml = new VoiceResponse();
  twiml.say({
      voice: 'woman',
    },
    `Thank you for calling the office of Representative ${REP_NAME}.
    The office is currently closed. Your opinion is very important, so please stay on the line to leave a message.
    I will now ask your name and zip code so that I have everything I need to properly record your message.`
  );
  twiml.redirect({
    method: 'GET'
  }, addCallState('/name', req.callState));

  res.type('text/xml');
  res.send(twiml.toString());
});


app.get('/name', (req, res) => {
  const twiml = new VoiceResponse();
  const gather = twiml.gather({
    input: 'speech',
    speechTimeout: 3,
    timeout: 3,
    method: 'GET',
    action: addCallState('/zip', req.callState)
  });

  gather.say({
      voice: 'woman',
    },
    `Please say your name, followed by the pound sign.`
  );
  gather.play('https://s3.amazonaws.com/articleone-ivr-tester-audio-dev/custom/beep.wav');

  res.type('text/xml');
  res.send(twiml.toString());
});


app.get('/zip', (req, res) => {
  req.callState.name = req.query.SpeechResult;

  const twiml = new VoiceResponse();
  const gather = twiml.gather({
    input: 'dtmf',
    method: 'GET',
    action: addCallState('/message', req.callState)
  });

  gather.say({
      voice: 'woman',
    },
    'Please enter your five digit zip code, followed by the pound sign.'
  );

  res.type('text/xml');
  res.send(twiml.toString());
});


app.get('/message', (req, res) => {
  req.callState.zip = req.query.Digits;

  const twiml = new VoiceResponse();
  const gather = twiml.gather({
    input: 'speech',
    speechTimeout: 3,
    timeout: 3,
    method: 'GET',
    action: addCallState('/end', req.callState)
  });

  gather.say({
      voice: 'woman',
    },
    'Thank you! Please leave your message at the tone.'
  );
  gather.play('https://s3.amazonaws.com/articleone-ivr-tester-audio-dev/custom/beep.wav');

  res.type('text/xml');
  res.send(twiml.toString());
});


app.get('/end', (req, res) => {
  req.callState.message = req.query.SpeechResult;
  console.log('Call State', req.callState);

  const twiml = new VoiceResponse();
  twiml.say({
      voice: 'woman',
    },
    `Thank you for calling the office of Representative ${REP_NAME}. Goodbye.`
  );
  twiml.hangup();

  res.type('text/xml');
  res.send(twiml.toString());
});

app.listen(3000, () => {
  console.log('App listening at http://localhost:3000.');
});