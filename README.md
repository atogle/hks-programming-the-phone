# Programming the Phone

An introduction to telephony programming for government using [Twilio](https://twilio.com). This primer was created for a [Technology & Democracy Workshop](https://ash.harvard.edu/event/technology-democracy-workshop-programming-phone) at the Ash Center of the Harvard Kennedy School of Government on March 27, 2018.

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


## 1. Get started
- [Set up your project and install Express.](https://expressjs.com/en/starter/installing.html)
- [Set up simple web server using Express.](https://github.com/atogle/hks-programming-the-phone/blob/master/1-getting-started/index.js)

- Access locally at http://localhost:3000 and publicly with ngrok.

## 2. Answer the phone with TwiML
- [Update web server to return raw TwiML.](https://github.com/atogle/hks-programming-the-phone/blob/master/2-answer-the-phone-twiml/index.js)

## 3. Answer the phone with code
- [Update web server to return TwiML via the Twilio JavaScript API.](https://github.com/atogle/hks-programming-the-phone/blob/master/3-answer-the-phone-code/index.js)

## 4. Gather input
- [Gather name, zip code, and message.](https://github.com/atogle/hks-programming-the-phone/blob/master/4-gather-input/index.js)

## 5. Save input
- [Use query string to save input.](https://github.com/atogle/hks-programming-the-phone/blob/master/5-save-input/index.js)

## 6. Confirm constituent
- [Leave message if caller is a constituent. Otherwise, refer caller to house.gov to identify their representative.](https://github.com/atogle/hks-programming-the-phone/blob/master/6-confirm-constituent/index.js)