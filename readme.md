# Travel app
-----

## Introduction
Travel-app is an aid to help you plan your next adventure anywhere in the world. This app will obtain a desired trip location & date from the user and display weather and an image of the location using information obtained from external APIs.

For this project, I used Webpack to manage all of my assets, built an Express server in Node.js to handle my routes, designed and created the page with HTML and Sass, used Javascript for my server code and to create Dom elements dynamically, used Jest for testing, and used Heroku for local development and deployment to the web.

You can view it here -> [travel-app](https://travel-app-bs.herokuapp.com/)

## Overview

This app will take in the form fields city, country, date of the trip, and provide you with information to aid you in a future trip.

* It will display a random image of your destination.
* If your trip is within 7 days it will give you the forecast for that day.
* Beyond 7 days, it will give you a 7-day forecast from that location.

## Project Features
- Node.js Express Server
- HTTP Requests and Routes
- Asynchronous JavaScript
- API Integration and Interdependencies
- Webpack Managment with Scripts, Rules, and Plugins
- Sass Styles
- Responsive Web Design
- Jest Implementation for Unit Testing

## Tech Stack (Dependencies)

### Technologies
* **Babel**
* **Cors**
* **Express**
* **Node**
* **Webpack**

### Development Setup
**1. Download the project locally:**
```
git clone https://github.com/briansegs/travel-app
```

**2. Create an empty repository in your Github account online. To change the remote repository path in your local repository, use the commands below:**
```
git remote -v
git remote remove origin
git remote add origin <https://github.com/<USERNAME>/<REPO_NAME>.git>
git branch -M main
```
Once you have finished editing your code, you can push the local repository to your Github account using the following commands.
```
git add . --all
git commit -m "your comment"
git push -u origin main
```

**3. Install the dependencies:**
* **Node.js** [Download Page](https://nodejs.org/en/download/)
* To install project dependencies: `npm i`

**4. Create a developer accounts to obtain API credentials to access APIs:**
* [Geonames](http://www.geonames.org/export/web-services.html)
* [Weatherbit](https://www.weatherbit.io/account/create)
* [Pixabay](https://pixabay.com/api/docs/)

**5. Creat a .env file in the root of the project directory add your keys:**
```
WBIT_API_KEY=<Weather bit API key>
USER_NAME=<Geonames user name>
PIX_API_KEY=<Pixabay API key>
```
**6. Running the project:**
* In Development Mode (can't make API calls) - `npm run build-dev`
* In Production Mode - `npm run build-prod`
    * Run the server - `npm start`

>**Note** In order to make API calls, you will need to do the following:
1. Delete the dist folder in the root of the project if it exists
2. Go into src/server/index.js
3. Remove the code on line 6:
```js
if (process.env.NODE_ENV == 'development')
```
4. run `npm run build-prod` in the command line followed by `npm start`.
5. Open your browser and go to [http://localhost:8081/](http://localhost:8081/)


## Wishlist For later

Here are some things I would like to add in the future:

* Redesign of front-end for better user experience
* Add end date and display length of trip
* Add more APIs like Google maps and Hotels
* Allow users to save trips