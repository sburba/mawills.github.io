# What's For Lunch
Lunch for the lazy

## Deploy
* Create a [zeit](https://zeit.co/now) account
* Install the zeit now client
```bash
npm install -g now
```
* Get an API key from [OpenWeatherMap](https://openweathermap.org/api)
* Set up the secret in your deployment account
```bash
now secrets add open-weather-api-key "<open-weather-api-key>"
```
* Deploy
```bash
now
```

## Local Dev

* Copy `.env.default` to `.env` and fill in the required values
```bash
cp .env.example .env
```
* Install all dependencies
```bash
yarn
```
* Start the dev server
```bash
now dev
```

Credits:

* Logo: [Google Noto Project](https://github.com/googlefonts/noto-emoji)
