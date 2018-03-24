/* jshint esversion: 6 */

const express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const app = express();

const REP_NAME = 'Aaron Ogle';
const MY_DISTRICT = 'HPA02';
const ZIP_DISTRICTS = require('./zip-districts.json');


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
    action: addCallState('/confirm-constituent', req.callState)
  });

  gather.say({
      voice: 'woman',
    },
    'Please enter your five digit zip code, followed by the pound sign.'
  );

  res.type('text/xml');
  res.send(twiml.toString());
});


app.get('/confirm-constituent', (req, res) => {
  req.callState.zip = req.query.Digits;
  const twiml = new VoiceResponse();
  const districtIds = ZIP_DISTRICTS[req.callState.zip];

  if (districtIds.includes(MY_DISTRICT)) {
    //CONSTITUENT! :)
    twiml.redirect({
      method: 'GET'
    }, addCallState('/message', req.callState));
  } else {
    //NOT CONSTITUENT! :(
    twiml.redirect({
      method: 'GET'
    }, addCallState('/nonconstituent-end', req.callState));
  }

  res.type('text/xml');
  res.send(twiml.toString());
});


app.get('/message', (req, res) => {
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


app.get('/nonconstituent-end', (req, res) => {
  const twiml = new VoiceResponse();
  twiml.say({
      voice: 'woman',
    },
    `Aaron Ogle does not represent zip code ${req.callState.zip}. Please visit house dot gov,
    slash representatives, slash find, to get the contact information for your representative.

    Thank you for calling the office of Representative ${REP_NAME}. Goodbye.`
  );
  twiml.hangup();

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