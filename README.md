# Currency rate app

In this project the following technologies were used:

*   Ruby as main programming language;
*   Rails as a web-application framework;
*   RSpec for tests definitions and launching;
*   PostgreSQL as a database;
*   ReactJS as frontend framework;
*   ActionCable for websocket connection;
*   Whenever for scheduling rake tasks.

## Usage

### Initial setup

*   `bundle install`
*   `yarn install`
*   `rake db:create`
*   `rake db:migrate`
*   `whenever --update-crontab --set environment=development`

### Running

    foreman start

Then run `localhost:3000` in latest version of Chrome or Firefox

### Testing
    rspec
