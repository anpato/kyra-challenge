# Kyra Challenge

### Setup

- `npm install` or `yarn install`
- `cd client` directory and `npm install` or `yarn install`
- You'll need the url for the cloud hosted database in order to start the server successfully, I can provide credentials for this.

### Dependencies

- Backend

  - node-cron
  - moment
  - express
  - mongoose
  - pusher
  - axios

- Frontend
  - React
  - Typescript
  - axios
  - react-google-charts
  - pusher
  - sass
  - react-loader-spinners

## Outline

I decided to build this challenge as an app with a small backend having the React client only display the necessary data. The backend is built using express and mongodb and pusher.

I decided to approach it in a way where I make requests to the Youtube api from the server, then capture and store the data in a mongodb database. I used the power of mongo's replica set's to help detect changes to documents in the database. When the server starts, it's creates a cron job, (a glorified timer) to make requests to the youtube api every 30 minutes. When a new upload is detected it triggers a change in the database firing off a chain of events. The process goes like this:

> - Makes request to youtube and stores new information
> - Fires of a change listener on the database that captures the new document
> - I then parse the database to recalculate the number of uploads per week in the last 18 months
> - Finally we send the data using a live pusher socket to update the front end in real time.

To parse the dates I ended up using Moment because of it's simplicity, but in the future I would love to try this with the normal Javascript Date constructor.

The videos being displayed on the front end are the ones captured and stored in the database, this alleviates and issues with incorrect keys in the data.

## Challenges

The most challenging part of this challenge was setting up the graphs for uploads, it's a lot of data to fit on the graph so it doesn't scale beautifully. I also had a tricky time setting up the process to find documents that fit in each date range. It wasn't as complex as I initially thought, but I would love to find a more efficient solution.

## Wins

The biggest win for me was setting up the live feed, I've never used pusher before so I had to learn how to use it and find out it's nuances while building this application. I've also never used a mongodb collection watch so that was also a first. But these two things have made we want to incorporate them into future projects!

## Summary

There were definitely some challenging parts to this task, and I enjoyed every bit of it. I never shy from a challenge and even though some parts had me going crazy, it was a great learning experience and I learned a few new things to add to my tool belt!

You can view the application live here! **[Kyra Challange](https://kyra-challenge.herokuapp.com/)**
