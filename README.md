# Programming the Phone

An introduction to telelphony programming for government using [Twilio](https://twilio.com). This primer was created for a [Technology & Democracy Workshop](https://ash.harvard.edu/event/technology-democracy-workshop-programming-phone) at the Ash Center of the Harvard Kennedy School of Government on March 27, 2018.

## Prerequisites
- Familiarity with command-line interfaces.
- Familiarity coding JavaScript.
- Sign up for a free [Twilio account](https://www.twilio.com/try-twilio).
- Sign up for a free [ngrok account](https://dashboard.ngrok.com/user/signup).

## Setup
- Install [node.js](https://nodejs.org) (if not already installed).
    - The simplest way is to use the [installer](https://nodejs.org).
    - You can test if node is installed by typing `node -v` in the command-line.
- Install [ngrok](https://ngrok.com/) (if not already installed).
    - The simplest way is to use the [installer](https://ngrok.com/download).
    - You can test if node is installed by typing `ngrok -v` in the command-line.
- [Download workshop source files](https://github.com/opengovfoundation/hks-programming-the-phone/).


## Get started
- hello world (local and ngrok access)

`npm install --save express`
Create `index.js`

Set up simple web server

  - Access locally
  - Access with ngrok

## Answer the phone
### TwiML
- twiml hello world

### Code
- Twilio api hello world

## Gather input
### name
- voice gather

### zip code
- dtmf gather

### message
- voice gather

## Save input
- Use query string

## Validate input
- leave message if constituent
- send to house.gov if not a constituent